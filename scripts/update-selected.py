"""Maintain the fixed-size Selected queue. Requires PyYAML.

Pass newly eligible source IDs to --enqueue in oldest-to-newest arrival order.
Replaying an admitted ID does not promote it or reintroduce an evicted paper.
Run --check for read-only validation; without arguments, repair derived YAML flags.
"""
import argparse
import json
from pathlib import Path
import re

import yaml

ROOT = Path(__file__).resolve().parents[1]
QUEUE_PATH = ROOT / '_data/seea/selected_queue.json'
PAPERS_PATH = ROOT / '_data/seea/publications.yml'


def enqueue(source_ids, source_id, capacity, pinned):
    result = [source_id] + list(source_ids)
    if len(result) > capacity:
        for index in range(len(result) - 1, -1, -1):
            if result[index] not in pinned:
                result.pop(index)
                break
        else:
            raise ValueError('Queue has no removable paper.')
    return result


def validate(queue, papers):
    ids = queue['source_ids']
    capacity = queue['capacity']
    pinned = set(queue['pinned_source_ids'])
    admitted = queue['admitted_source_ids']
    if not isinstance(capacity, int) or capacity <= len(pinned):
        raise ValueError('Capacity must leave room for unpinned papers.')
    if len(ids) != capacity or len(set(ids)) != len(ids):
        raise ValueError('Queue must contain exactly capacity distinct papers.')
    if not pinned.issubset(ids):
        raise ValueError('A pinned paper is missing from the queue.')
    if len(set(admitted)) != len(admitted) or not set(ids).issubset(admitted):
        raise ValueError('Admission history is inconsistent.')
    for source_id in ids:
        if sum(p.get('source_id') == source_id for p in papers) != 1:
            raise ValueError(f'Queue source ID must resolve exactly once: {source_id}')


def update_flags(source, ranks):
    blocks = re.split(r'(?m)(?=^- )', source)
    for index, block in enumerate(blocks):
        if not block.strip():
            continue
        paper = yaml.safe_load(block)[0]
        rank = ranks.get(paper.get('source_id'))
        block = re.sub(r'^  selected_rank:.*\n?', '', block, flags=re.M)
        selected_line = f'  selected: {str(rank is not None).lower()}\n'
        if re.search(r'^  selected:', block, re.M):
            block = re.sub(r'^  selected:.*\n?', selected_line, block, flags=re.M)
        else:
            first, remainder = block.split('\n', 1)
            block = first + '\n' + selected_line + remainder
        if rank is not None:
            block = block.replace(selected_line, selected_line + f'  selected_rank: {rank}\n', 1)
        blocks[index] = block
    return ''.join(blocks)


def write_changed(path, content):
    if path.read_text() != content:
        temporary = path.with_suffix(path.suffix + '.tmp')
        temporary.write_text(content)
        temporary.replace(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--enqueue', nargs='+', default=[])
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    if args.check and args.enqueue:
        parser.error('--check cannot enqueue papers')
    queue = json.loads(QUEUE_PATH.read_text())
    source = PAPERS_PATH.read_text()
    papers = yaml.safe_load(source)
    validate(queue, papers)
    for source_id in args.enqueue:
        if source_id in queue['admitted_source_ids']:
            continue
        matches = [p for p in papers if p.get('source_id') == source_id]
        if len(matches) != 1:
            raise ValueError(f'Candidate source ID must resolve exactly once: {source_id}')
        paper = matches[0]
        if paper.get('selection_eligible') is not True or not paper.get('selection_reason'):
            raise ValueError(f'Candidate lacks confirmed relevance and a reason: {source_id}')
        queue['source_ids'] = enqueue(queue['source_ids'], source_id, queue['capacity'],
                                      set(queue['pinned_source_ids']))
        queue['admitted_source_ids'].append(source_id)
    validate(queue, papers)
    ranks = {source_id: index + 1 for index, source_id in enumerate(queue['source_ids'])}
    if args.check:
        for paper in papers:
            expected = ranks.get(paper.get('source_id'))
            if bool(paper.get('selected')) != (expected is not None):
                raise ValueError(f'Selected flag disagrees with queue: {paper["title"]}')
            if paper.get('selected_rank') != expected:
                raise ValueError(f'Selected rank disagrees with queue: {paper["title"]}')
    else:
        # Queue is authoritative. A retry can repair YAML if interrupted between writes.
        write_changed(QUEUE_PATH, json.dumps(queue, indent=2) + '\n')
        write_changed(PAPERS_PATH, update_flags(source, ranks))
    print(json.dumps({'capacity': queue['capacity'], 'source_ids': queue['source_ids']}, indent=2))


if __name__ == '__main__':
    main()
