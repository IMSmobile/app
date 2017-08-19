Attribute VB_Name = "NewMacros"
Sub TabellenLayout()
    Dim tbl As Table
    For Each Table In ActiveDocument.Tables
        Table.Style = "Github Stil Tabelle"
        Table.AutoFitBehavior wdAutoFitFixed
        Table.Range.Font.Size = 10
        With ActiveDocument.PageSetup
            Table.PreferredWidth = .PageWidth - .LeftMargin - .RightMargin
        End With
    Next
End Sub
