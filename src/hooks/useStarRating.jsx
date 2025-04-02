export function useStarRating(rating) {
    rating = Number(rating);
    let fullStars = Math.floor(rating); // Full stars (★)
    let halfStar = rating % 1 >= 0.5;   // One Half star (⭐½)
    let emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Empty stars (☆)
  
    return (
      <span style={{color:'#eab308'}} className="flex gap-1">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <i key={i} className="fa-solid fa-star"></i>
        ))}
  
        {/* Half Star */}
        {halfStar && <i className="fa-solid fa-star-half-stroke"></i>}
  
        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={i + fullStars} className="fa-regular fa-star"></i>
        ))}
      </span>
    );
  }