interface TrendingItem {
  title: string;
  year: number;
  rating: number;
  imageUrl: string;
}

interface TrendingSidebarProps {
  items: TrendingItem[];
}

export function TrendingSidebar({ items }: TrendingSidebarProps) {
  return (
    <div className="w-80 bg-gray-900/50 p-6">
      <h2 className="text-white text-xl mb-6">TRENDS NOW</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 group cursor-pointer">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-16 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-white group-hover:text-orange-500 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 text-sm">{item.year}</span>
                <div className="flex items-center gap-1">
                  <span className="text-orange-500 text-sm">★</span>
                  <span className="text-orange-500 text-sm">{item.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}