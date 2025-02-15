import { Caption } from '../types';
import { Bot, Quote } from 'lucide-react';

interface CaptionDisplayProps {
  caption: Caption | null;
  isLoading: boolean;
}

const CaptionDisplay = ({ caption, isLoading }: CaptionDisplayProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md w-full md:w-1/2 flex flex-col gap-4 justify-start">
      <h2 className='text-3xl text-blue-500 font-bold uppercase text-center'>Suggested Captions</h2>
      {
        isLoading && (
          <div className="animate-pulse flex flex-col items-start gap-4">
            <div className="h-4 bg-gray-500 rounded w-full"></div>
            <div className="h-4 bg-gray-500 rounded w-3/4"></div>
            <div className="h-4 bg-gray-500 rounded w-1/2"></div>
          </div>
        )
      }
      { !isLoading && caption !== null && (
          <div className='flex flex-col justify-between gap-4 h-full'>
            <div>
              <Quote className="h-8 w-8 text-blue-500 mb-4" />
              <ol className='flex flex-col gap-4 px-4 list-decimal'>
                {caption.text.map((item, index) => {
                  return (
                    <li className='list-item' key={index}>
                      <p className="text-lg text-gray-800 italic">
                        {item}
                      </p>
                    </li>
                  )}
                )}
              </ol>
              <Quote className="h-8 w-8 text-blue-500 mt-4" />
            </div>
            <div>
              <p className="text-md text-gray-500 mt-2">
                Generated on {caption.timestamp.toLocaleString()}
              </p>
            </div>
          </div>
        )
      }
      {
        !isLoading && caption === null && (
          <div className='h-full flex flex-col justify-center items-center p-2 gap-3 border-4 border-dashed'>
            <Bot className='h-40 w-40 text-blue-500 opacity-60' />
            <p className="text-lg text-gray-800 italic">
              Click on <span className='text-blue-500 font-semibold'>Generate Caption</span> button to generate new caption
            </p>
          </div>
        )
      }
    </div>
  );
};

export default CaptionDisplay;