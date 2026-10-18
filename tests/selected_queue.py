"""Regression checks for the pinned FIFO Selected queue, without editing the site."""
import importlib.util
from contextlib import redirect_stdout
from io import StringIO
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import yaml

spec = importlib.util.spec_from_file_location(
    'selected_queue', Path(__file__).resolve().parents[1] / 'scripts/update-selected.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class SelectedQueueTests(unittest.TestCase):
    def test_pinned_paper_drifts_to_tail_and_stays(self):
        queue = ['a', 'sizegs', 'b', 'c']
        for new, expected in [
            ('d', ['d', 'a', 'sizegs', 'b']),
            ('e', ['e', 'd', 'a', 'sizegs']),
            ('f', ['f', 'e', 'd', 'sizegs']),
            ('g', ['g', 'f', 'e', 'sizegs']),
        ]:
            queue = module.enqueue(queue, new, 4, {'sizegs'})
            self.assertEqual(queue, expected)

    def test_eviction_does_not_remove_paper_record(self):
        papers = [{'source_id': key} for key in ['a', 'b', 'sizegs', 'c']]
        queue = module.enqueue(['a', 'b', 'sizegs'], 'c', 3, {'sizegs'})
        self.assertEqual(queue, ['c', 'a', 'sizegs'])
        self.assertEqual(len(papers), 4)

    def test_missing_pinned_paper_is_rejected(self):
        with self.assertRaises(ValueError):
            module.validate({'capacity': 2, 'source_ids': ['a', 'b'],
                             'pinned_source_ids': ['sizegs'],
                             'admitted_source_ids': ['a', 'b']},
                            [{'source_id': 'a'}, {'source_id': 'b'}])

    def test_replaying_evicted_paper_never_reintroduces_it(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            queue_path, papers_path = root / 'queue.json', root / 'papers.yml'
            queue_path.write_text(json.dumps({
                'capacity': 3, 'source_ids': ['a', 'b', 'sizegs'],
                'pinned_source_ids': ['sizegs'], 'admitted_source_ids': ['a', 'b', 'sizegs']}))
            papers_path.write_text(yaml.safe_dump([
                {'source_id': key, 'title': key, 'selected': key != 'c',
                 **({'selected_rank': rank} if key != 'c' else {}),
                 'selection_eligible': True, 'selection_reason': 'Directly related.'}
                for rank, key in enumerate(['a', 'b', 'sizegs', 'c'], 1)], sort_keys=False))
            with patch.multiple(module, QUEUE_PATH=queue_path, PAPERS_PATH=papers_path):
                with patch('sys.argv', ['update-selected.py', '--enqueue', 'c']), redirect_stdout(StringIO()):
                    module.main()
                before = queue_path.read_text(), papers_path.read_text()
                with patch('sys.argv', ['update-selected.py', '--enqueue', 'b', 'c']), redirect_stdout(StringIO()):
                    module.main()
                self.assertEqual((queue_path.read_text(), papers_path.read_text()), before)
                self.assertEqual(json.loads(queue_path.read_text())['source_ids'], ['c', 'a', 'sizegs'])
                self.assertEqual(len(yaml.safe_load(papers_path.read_text())), 4)

    def test_ineligible_candidate_leaves_both_files_unchanged(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            queue_path, papers_path = root / 'queue.json', root / 'papers.yml'
            queue_path.write_text(json.dumps({
                'capacity': 2, 'source_ids': ['a', 'sizegs'],
                'pinned_source_ids': ['sizegs'], 'admitted_source_ids': ['a', 'sizegs']}))
            papers_path.write_text(yaml.safe_dump([
                {'source_id': key, 'title': key} for key in ['a', 'sizegs', 'irrelevant']]))
            before = queue_path.read_text(), papers_path.read_text()
            with patch.multiple(module, QUEUE_PATH=queue_path, PAPERS_PATH=papers_path):
                with patch('sys.argv', ['update-selected.py', '--enqueue', 'irrelevant']):
                    with self.assertRaises(ValueError):
                        module.main()
            self.assertEqual((queue_path.read_text(), papers_path.read_text()), before)


if __name__ == '__main__':
    unittest.main()
