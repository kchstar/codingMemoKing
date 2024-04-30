import { useState } from 'react'
import PDFMerger from 'pdf-merger-js';
import './App.css'

function App() {
  const [files, setFiles] = useState([])

  const handleFiles = (e) =>{

    const selectedFiles = Array.from(e.target.files)
    // console.log("selectedFiles", selectedFiles)
    setFiles(selectedFiles)
  }
    const handlePdfMerging=()=>{
      var merger = new PDFMerger();

    (async () => {
      await merger.add('pdf1.pdf');  //merge all pages. parameter is the path to file and filename.
      await merger.add('pdf2.pdf', 2); // merge only page 2
      await merger.add('pdf2.pdf', [1, 3]); // merge the pages 1 and 3
      await merger.add('pdf2.pdf', '4, 7, 8'); // merge the pages 4, 7 and 8
      await merger.add('pdf3.pdf', '3 to 5'); //merge pages 3 to 5 (3,4,5)
      await merger.add('pdf3.pdf', '3-5'); //merge pages 3 to 5 (3,4,5)
    
      // Set metadata
      await merger.setMetadata({
        producer: "pdf-merger-js based script",
        author: "John Doe",
        creator: "John Doe",
        title: "My live as John Doe"
      });
      
      await Promise.all(
        files.map(async(file) =>{
          await merger.all(file);
          
       })
      )

      await merger.save('merged.pdf'); //save under given name and reset the internal document
      
      // Export the merged PDF as a nodejs Buffer
      // const mergedPdfBuffer = await merger.saveAsBuffer();
        // fs.writeSync('merged.pdf', mergedPdfBuffer);
    })
  }

  return (
    <>
      <div>
       <input 
       type="file"
       multiple
       onChange={handleFiles}></input>

      <button onClick={handlePdfMerging}>Merge PDFs</button>  
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <hr></hr>
      <h3>
        <li>
          오늘은 시간상 결합(Merging)까지만... </li>
        <li>
          다음시간에는 각 파일 페이지 편집까지 해보죠 </li>  
        
      </h3>
    </>
  )
}

export default App
