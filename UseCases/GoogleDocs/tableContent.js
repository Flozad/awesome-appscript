function updateTableOfContentsAndStyles() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();

  // Define your style guidelines
  var headingStyles = {
    HEADING_1: { fontSize: 18, bold: true, italic: false },
    HEADING_2: { fontSize: 16, bold: true, italic: false },
    HEADING_3: { fontSize: 14, bold: true, italic: false },
    // Define more styles as needed
  };

  // Apply styles and construct TOC data
  var tocEntries = [];
  var paragraphs = body.getParagraphs();
  paragraphs.forEach(function (paragraph) {
    var heading = paragraph.getHeading();
    if (headingStyles[heading]) {
      // Apply the style
      paragraph.setAttributes(headingStyles[heading]);

      // Add entry to TOC data
      var text = paragraph.getText();
      var tocEntry = { text: text, headingLevel: heading, position: paragraph };
      tocEntries.push(tocEntry);
    }
  });

  // Create or update TOC
  updateOrCreateTOC(doc, tocEntries);
}

function updateOrCreateTOC(doc, tocEntries) {
  var body = doc.getBody();
  var toc = body.findText("Table of Contents");
  if (toc) {
    // Clear existing TOC
    var tocParagraph = toc.getElement().getParent();
    var followingParagraph = tocParagraph.getNextSibling();
    while (
      followingParagraph &&
      !followingParagraph
        .getHeading()
        .isEqualTo(DocumentApp.ParagraphHeading.NORMAL)
    ) {
      var temp = followingParagraph;
      followingParagraph = followingParagraph.getNextSibling();
      temp.removeFromParent();
    }
  } else {
    // Create new TOC heading
    toc = body.insertParagraph(0, "Table of Contents");
    toc.setHeading(DocumentApp.ParagraphHeading.HEADING_1);
  }

  // Populate TOC
  tocEntries.forEach(function (entry) {
    var tocText = entry.text;
    var tocEntry = body.insertParagraph(body.getChildIndex(toc) + 1, tocText);
    tocEntry.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    tocEntry.setLinkUrl("#" + encodeURIComponent(tocText));
  });
}
