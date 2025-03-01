import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Copy } from 'lucide-react';

function ViewHTMLDialog({ openDialog, htmlCode, closeDialog }) {

  const CopyCode =()=> {
      navigator.clipboard.writeText(htmlCode);
  }
    
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <div className='flex items-center justify-between'>
            <h2>HTML Email Template</h2>
            <Copy className='p-2 bg-gray-100 rounded-lg h-9 w-9 cursor-pointer' onClick={CopyCode}/>
            </div>
            </DialogTitle>
          <DialogDescription>
            <div className="max-h-[400px] overflow-auto bg-black text-white rounded-lg p-5">
              <pre className="whitespace-pre-wrap break-all">
                <code lang="html">{htmlCode}</code>
              </pre>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewHTMLDialog;
