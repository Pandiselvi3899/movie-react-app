export function ColorBox({color}){
    const styles={
      height:"75px",
      width:"150px",
      backgroundColor:color,
      margin:"10px 0px",
    };
    return <div className="input" style={styles}></div>;
    }