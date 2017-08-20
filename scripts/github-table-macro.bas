Attribute VB_Name = "NewMacros"
Sub ArkviarPublication()
   Title = "Arkivar - Mobiler Client für Imagic IMS"
   Author = "Michael Leu;Niklaus Tschirky;Sandro Zbinden"
   Subject = "MAS Abschlussarbeit"
   ActiveDocument.BuiltInDocumentProperties("title").Value = Title
   ActiveDocument.BuiltInDocumentProperties("author").Value = Author
   ActiveDocument.BuiltInDocumentProperties("subject").Value = Subject

    Dim tbl As Table
    For Each Table In ActiveDocument.Tables
        Table.Style = "Github Stil Tabelle"
        Table.AutoFitBehavior wdAutoFitFixed
        Table.Range.Font.Size = 9
        With ActiveDocument.PageSetup
            Table.PreferredWidth = .PageWidth - .LeftMargin - .RightMargin
        End With
    Next
End Sub
