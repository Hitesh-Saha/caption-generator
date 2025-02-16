import { Loader, Zap } from "lucide-react";

interface ImagePreviewerProps {
  url: string;
  loader:boolean;
  captionStyle: string;
  handleCancel: () => void;
  handleClick: () => void;
  handleChange: (style: string) => void;
}

const ImagePreviewer = ({url, loader, captionStyle, handleCancel, handleClick, handleChange }: ImagePreviewerProps) => {
  const captionStyles = [
    'funny', 'inspirational', 'poetic', 'emotional', 'fantasy', 'creative'
  ];

  return (
    <div className='flex flex-col gap-4 w-full md:w-1/2'>
      {!loader && (
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <img
              src={url}
              alt="Uploaded artwork"
              className="object-cover w-full h-full"
          />
        </div>
      )}
      {loader && (
        <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center gap-3 shadow-md bg-white">
          <Loader className="w-12 h-12 animate-[spin_3s_infinite] opacity-80" />
          <span className="text-xl font-bold opacity-80">Processing</span>
        </div>
      )}
      <div className='flex flex-row gap-4 justify-between'>
        <select className="capitalize w-52 p-2 border-2 rounded-lg text-lg cursor-pointer" defaultValue={captionStyle} onChange={(e) => handleChange(e.target.value)}>
          {
            captionStyles.map((item,index) => {
              return (
                <option key={index} value={item} className="capitalize">
                  { item }
                </option>
              )
            })
          }
        </select>
        <button className='rounded-lg bg-red-600 p-3 text-white uppercase font-bold hover:bg-red-950' onClick={handleCancel}>Discard</button>
        <button className='flex gap-1 items-center rounded-lg bg-blue-600 p-3 text-white uppercase font-bold hover:bg-blue-950' onClick={handleClick}>Generate Caption <Zap className='text-orange-400'/></button>
      </div>
    </div>
  )
}

export default ImagePreviewer