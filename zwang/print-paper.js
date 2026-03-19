function highlightAbbr(venueStr) {
	// Highlight venue abbreviations in parentheses, e.g. (CVPR), (TPAMI), (TMM)
	// Skip (CCF-A), (JCR-Q1), and other ranking annotations which use <font> tags
	return venueStr.replace(/\(([A-Z][A-Za-z\/&]+(?:\s+\d{4})?)\)/g, function(match, abbr) {
		// Skip if it looks like a ranking tag (CCF-A, JCR-Q1, etc.)
		if (/^CCF|^JCR|^Impact/i.test(abbr)) return match;
		return '(<span class="venue-abbr">' + abbr + '</span>)';
	});
};

function printNews(news) {
	document.write("<li><span style='color:#5a6a7a; font-size:0.88rem; font-weight:600;'>" + news.date + "</span> &mdash; " + news.what + "</li>");
};

function printAuthor(author) {
    if (author.web != "#") document.write("<a href=\""+author.web+"\">"+author.name+"</a>");
    else document.write(author.name);
};


function printPaper(paper, num){
    document.write("<p>");
    if (typeof paper.authors != "undefined"){
        var i;
		if (num >= 0) {
			document.write("<span style='color:#5a6a7a; font-weight:600;'>" + num + ".</span> ");
		}
        for (i = 0; i < paper.authors.length; i++){
            printAuthor(paper.authors[i]);
            if (i == paper.authors.length - 2)
                document.write(" and ");
            else if (i != paper.authors.length - 1) document.write(", ");
        }
		document.write(". ");
    }
    document.write("<span class=title style=\"cursor:pointer\" onclick=\"return toggleAbstract(\'abs-" + paper.id + "\');\">");
    document.write("&ldquo;" + paper.name +",&rdquo;</span> ");

    if (typeof paper.conference == "string") document.writeln("In Proceedings of <span class=conference>" + highlightAbbr(paper.conference) + "</span> ");
	else if (typeof paper.journal == "string") document.writeln("In <span class=journal>" + highlightAbbr(paper.journal) + "</span> ");
    else document.writeln("<i>Manuscript</i> ");
    if (typeof paper.paperPDF == "string") document.write(" <a href=\""+paper.paperPDF+"\" target=\"_blank\" style=\"display:inline-block; padding:1px 8px; font-size:0.78rem; font-weight:600; border-radius:4px; background:#f5f0eb; color:#2a6496; text-decoration:none;\" onclick=\"_gaq.push(['_trackEvent','Download','PDF',this.href]);\">[pdf]</a>"); 
    if (typeof paper.slides == "string") document.write(" <a href=\""+paper.slides+"\" style=\"display:inline-block; padding:1px 8px; font-size:0.78rem; font-weight:600; border-radius:4px; background:#f5f0eb; color:#2a6496; text-decoration:none;\">[slides]</a>");
    
    if (typeof paper.bibitem == "string") {
	document.write("<span class=title style=\"cursor:pointer\" onclick=\"return toggleAbstract(\'bib-" + paper.id + "\');\">");
	document.write("<span style=\"display:inline-block; padding:1px 8px; font-size:0.78rem; font-weight:600; border-radius:4px; background:#f5f0eb; color:#2a6496; cursor:pointer;\"> [bibitem] </span></span>");
		
        document.writeln("<div class=\"abstract\" id=\'bib-" + paper.id + "\'>");
        document.writeln("<p><b>bibitem</b></p>");
        document.writeln(paper.bibitem);
        document.writeln("</div>");
    };
	
    if (typeof paper.projectLink == "string" && paper.projectLink !== "") document.write(" <a href=\""+paper.projectLink+"\" style=\"display:inline-block; padding:1px 8px; font-size:0.78rem; font-weight:600; border-radius:4px; background:#f5f0eb; color:#2a6496; text-decoration:none;\"> [project] </a>");
    
    if (typeof paper.paperAbstract == "string") {
           document.writeln("<div class=\"abstract\" id=\'abs-" + paper.id + "\'>");
           document.writeln("<p><b>Abstract</b></p>");
           document.writeln(paper.paperAbstract);
           document.writeln("</div>");		
	
       };
    
    
    document.write("</p>");
};

function printPapers(Papers, onlyRep) {
	var i, j;

	for (i = 0; i < Papers.length; i++) {
		if (onlyRep && Papers[i].rep != 1)
			continue;

		document.write("<span class=paper>");
        printPaper(Papers[i]);
        document.write("</span>");
    }	
};

function printPapersByYear(Papers, onlyRep) {
	var i, j;
	
	var years = new Set();
	
	for (i = 0; i < Papers.length; i++) {
		years.add(Papers[i].year);
	}
	
	console.log(years);

	yearsArray = Array.from(years).sort().reverse();
	
	for (j = 0; j < yearsArray.length; j++) {
		var year = yearsArray[j];
		
		document.writeln("<p style='font-family: Playfair Display, Georgia, serif; font-size: 1.1rem; font-weight: 600; color: #1a2a3a; margin: 24px 0 8px; padding-bottom: 4px; border-bottom: 1px solid #e0ddd7;'>" + year + "</p>");
		
		for (i = 0; i < Papers.length; i++) {
			if (Papers[i].year != year)
				continue
			
			if (onlyRep && Papers[i].rep != 1)
				continue;

			document.write("<span class=paper>");
	        printPaper(Papers[i]);
	        document.write("</span>");
	    }	
	}
	
	
};

function printPapersForAYear(Papers, year, onlyRep) {
	var i, j;
	
	var years = new Set();
	
	for (i = 0; i < Papers.length; i++) {
		years.add(Papers[i].year);
	}
	
	console.log(years);

	yearsArray = Array.from(years).sort().reverse();
	
		
	for (i = 0; i < Papers.length; i++) {
		if (Papers[i].year != year)
			continue
		
		if (onlyRep && Papers[i].rep != 1)
			continue;

		document.write("<span class=paper>");
        printPaper(Papers[i]);
        document.write("</span>");
    }	

	
	
};
