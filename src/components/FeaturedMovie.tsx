import { Play } from "lucide-react";

interface FeaturedMovieProps {
  title: string;
  year: number;
  genre: string;
  duration?: string;
  rating?: number;
  description?: string;
  backgroundImage: string;
}

export function FeaturedMovie({ 
  title, 
  year, 
  genre, 
  duration, 
  rating, 
  description, 
  backgroundImage
}: FeaturedMovieProps) {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-center px-6 max-w-2xl">
        <div className="mb-6">

          
          {description && (
            <div className="mb-6">
              <h1 className="text-white text-4xl mb-4">{title}</h1>
              <div className="flex items-center gap-4 text-gray-300 mb-4">
                <span>{genre}</span>
                <span>•</span>
                <span>{year}</span>
                {duration && (
                  <>
                    <span>•</span>
                    <span>{duration}</span>
                  </>
                )}
                {rating && (
                  <>
                    <span>•</span>
                    <span>Rating {rating}</span>
                  </>
                )}
              </div>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8">
        <button className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors group">
          <Play className="w-6 h-6 text-white ml-1 group-hover:scale-110 transition-transform" />
        </button>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <h2 className="text-white text-xl mb-2">{title}</h2>
        <p className="text-gray-300">({genre}, {year})</p>
      </div>
    </div>
  );
}