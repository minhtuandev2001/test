import { useEffect, useRef, useState } from "react";
import "./App.css";
import Ball from "./components/Ball";

function App() {
  const divRef = useRef(null);
  const [coords, setCoords] = useState(null);
  const [numberBall, setNumberBall] = useState(0);
  const [listBall, setListBall] = useState([]);
  const [announce, setAnnounce] = useState({
    color: 'black',
    title: "LET'S PLAY"
  });
  const [textPlay, setTextPlay] = useState(true);
  const [time, setTime] = useState(0.0);
  const timeRef = useRef(null);
  useEffect(() => {
    if (divRef.current) {
      console.log("check ", divRef.current.getBoundingClientRect());
      setCoords(divRef.current.getBoundingClientRect());
    }
    window.addEventListener("resize", () => {
      if (divRef.current) {
        console.log("check ", divRef.current.getBoundingClientRect());
        setCoords(divRef.current.getBoundingClientRect());
      }
    });
  }, []);
  const handleRestart = () => {
    if (numberBall === 0) return;
    setTextPlay(false); // đổi nội dung button play => restart 
    setTime(0.0);
    setAnnounce({
      color: 'black',
      title: "LET'S PLAY"
    });
    console.log("check ", divRef.current.getBoundingClientRect());
    let arrBall = [];
    if (coords != null) {
      for (let i = 0; i < numberBall; i++) {
        let top = Math.floor(Math.random() * (coords.height)) + 1;
        let left = Math.floor(Math.random() * (coords.width)) + 1
        // xử lý khi bóng nằm gần mép dưới hoặc mép bên phải 
        // 53 =  kích thước bóng + khoảng cách biên tự cho
        if (top >= (coords.height - 53)) {
          top = top - (top - (coords.height - 53));
        }
        if (left >= (coords.width - 53)) {
          left = left - (left - (coords.height - 53));
        }
        arrBall.push({
          index: i,
          top: top,
          left: left,
        })
      }
    }
    timeStart() // khởi động bộ đếm thời gian
    setListBall(arrBall);
  }
  const handleDeleteBall = (index) => {
    // xóa phaàn tử
    setListBall(listBallPre => {
      // check xóa đúng theo thứ tự
      if (listBallPre[0].index !== index) {
        console.log("check 1", listBallPre[0], index)
        setAnnounce({
          color: 'red',
          title: "GAME OVER"
        });
        timeEnd();
        return listBallPre;
      }
      // kết thúc check xóa đúng theo thứ tự
      let listTemp = listBallPre.filter(item => item.index !== index);
      // kiểm tra game kết thúc
      if (listTemp.length === 0) {
        setAnnounce({
          color: 'green',
          title: "ALL CLEARED"
        });
        timeEnd();
      }
      return listTemp;
    });
    // kết thúc xóa phần tử
  }

  const timeStart = () => {
    if (timeRef.current !== null) clearInterval(timeRef.current);
    timeRef.current = setInterval(() => {
      setTime(prevTime => parseFloat((prevTime + 0.1).toFixed(1)));
    }, 100);
  }
  const timeEnd = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current)
    }
    timeRef.current = null; // cập nhật lại timeRef
  }
  return (
    <div className="App">
      <p className="title" style={{
        color: announce.color,
      }}>{announce.title}</p>
      <div>
        <div className="group">
          <p>Points:</p>
          <input type="text" onChange={(e) => setNumberBall(e.target.value)} />
        </div>
        <div className="group">
          <p>Time:</p>
          <p>{time === 0 ? '0.0' : time}s</p>
        </div>
      </div>
      <button className="restart" onClick={handleRestart}>{textPlay ? 'Play' : 'Restart'}</button>
      <div ref={divRef} className="board_game">
        {listBall.length > 0 && listBall.map((ball, index) =>
          <Ball
            key={(ball.index + ball.top).toString()}
            handleDeleteBall={handleDeleteBall}
            ball={ball}
          ></Ball>
        )}
      </div>
    </div>
  );
}

export default App;

