import { Zap } from "lucide-react";

interface ImagePreviewerProps {
  url: string;
  handleCancel: () => void;
  handleClick: () => void;
}

const ImagePreviewer = ({url, handleCancel, handleClick }: ImagePreviewerProps) => {
  return (
    <div className='flex flex-col gap-3 w-full md:w-1/2'>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <img
            src={url}
            alt="Uploaded artwork"
            className="object-cover w-full h-full"
        />
        </div>
        <div className='flex flex-row gap-4'>
        <button className='rounded-lg bg-red-600 p-3 text-white uppercase font-bold hover:bg-red-950' onClick={handleCancel}>Cancel</button>
        <button className='flex gap-1 items-center rounded-lg bg-blue-600 p-3 text-white uppercase font-bold hover:bg-blue-950' onClick={handleClick}>Generate Caption <Zap className='text-orange-400'/></button>
        </div>
    </div>
  )
}

export default ImagePreviewer