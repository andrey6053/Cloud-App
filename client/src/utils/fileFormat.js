import {
   Access,
   Excel,
   Word,
   OneNote,
   PowerPoint,
   Outlook,
   MsVisio,
   Publisher,
   Pdf,
   IconDir,
   IconFile
} from '../assets/index.js'

export default function fileFormat(type) {
   switch (type) {
      case ("ost"): return Outlook
      case ("pst"): return Outlook
      case ("one"): return OneNote
      case ("mdb", "accdb"): return Access
      case ("accdb"): return Access
      case ("xlsx"): return Excel
      case ("csv"): return Excel
      case ("pptx"): return PowerPoint
      case ("docx"): return Word
      case ("dotm"): return Word
      case ("dotx"): return Word
      case ("docm"): return Word
      case ("pdf"): return Pdf
      default: return IconFile
   }
}