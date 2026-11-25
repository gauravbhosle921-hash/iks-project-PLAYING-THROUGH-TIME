from pathlib import Path
import json, re
from pypdf import PdfReader

root=Path(__file__).resolve().parents[3]
docs=[
 ('chess','01 · Chaturanga and the Evolution of Chess','01-chaturanga-to-chess.pdf'),
 ('pachisi','02 · Chausar, Chaupar and Pachisi to Ludo','02-chausar-pachisi-to-ludo.pdf'),
 ('cricket','03 · Gilli-Danda and Cricket','03-gilli-danda-to-cricket.pdf'),
 ('wrestling','04 · Malla-Yuddha to Modern Wrestling','04-malla-yuddha-to-wrestling.pdf'),
]
chunks=[]
size=1250
overlap=180
for game,title,filename in docs:
    pdf=root/'sources'/filename
    reader=PdfReader(str(pdf))
    for page_no,page in enumerate(reader.pages,1):
        text=re.sub(r'\s+',' ',page.extract_text() or '').strip()
        if not text:
            continue
        start=0
        while start<len(text):
            end=min(start+size,len(text))
            if end<len(text):
                boundary=max(text.rfind('. ',start+size//2,end),text.rfind('; ',start+size//2,end),text.rfind(' ',start+size//2,end))
                if boundary>start:
                    end=boundary+1
            piece=text[start:end].strip()
            if piece:
                chunks.append({'game':game,'title':title,'file':filename,'page':page_no,'text':piece})
            if end>=len(text):
                break
            start=max(start+1,end-overlap)
out=Path(__file__).with_name('research-index.mjs')
out.write_text('export default '+json.dumps(chunks,ensure_ascii=False,separators=(',',':'))+';\n')
print(f'created {len(chunks)} indexed excerpts ({out.stat().st_size} bytes)')
