import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useEffect } from "react";

export function Counter() {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);
  useEffect(()=>{
    console.log("Like is Changed :" ,like);
  },[like,disLike])
  return (
    <div className="counter-container">
      <IconButton className="likes-dislikes"
        onClick={() => setLike(like + 1)}
        color="primary"
        aria-label="likes"
        component="span"
      >
        <Badge
          badgeContent={like} color="primary">
          👍
        </Badge>
      </IconButton>
      <IconButton className="likes-dislikes"
        onClick={() => setDisLike(disLike + 1)}
        color="primary"
        aria-label="dislikes"
        component="span"
      >
        <Badge badgeContent={disLike} color="error">
          👎
        </Badge>

      </IconButton>

      {/* <button className="likes-dislikes" onClick={() => setDisLike(disLike + 1)}>👎 {disLike}</button> */}
    </div>
  );
}