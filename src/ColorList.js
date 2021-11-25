import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ColorBox } from "./colorgame";

export function ColorList() {
  const [color, setColor] = useState("orange");
  const styles = { backgroundColor: color, color: "black" };
  const Initial_colors = ["crimson", "orange", "skyblue", "pink"];
  const [colors, setColors] = useState(Initial_colors);
  return (
    <div className="color-game" >
      {/* <input
            value={color}
            style={styles}
            onChange={(event)=>setColor(event.target.value)}
            placeholder="Enter a color"
            /> */}
      <TextField
        value={color}
        style={styles}
        onChange={(event) => setColor(event.target.value)}
        label="Enter a color"
        variant="outlined" />
      {/* <Button variant="contained">Contained</Button> */}
      <Button variant="contained"
        onClick={() => setColors([...colors, color])}
      >Add Color</Button>

      {colors.map((clr, index) => (
        <ColorBox key={index} color={clr} />
      ))}
    </div>
  );
}