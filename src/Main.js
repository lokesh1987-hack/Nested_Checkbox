import { useState } from "react";
import Data from "./Data";

function Main() {
  const [gettingData, setGettingData] = useState(Data);

  const handler = (e, std_id, who) => {
    const { name, checked } = e.target;
    let len = gettingData[std_id].student.length;
    let localVariable = [...gettingData];

    if (who.press === "parent") {
      if (checked) {
        localVariable[std_id].checked = "checked";
        for (var i = 0; i < len; i++) {
          localVariable[std_id].student[i].checked = "checked";
        }
      } else {
        delete localVariable[std_id].checked;
        for (var i = 0; i < len; i++) {
          delete localVariable[std_id].student[i].checked;
        }
      }
    } else {
      let count = 0;
      if (checked) {
        localVariable[std_id].student[name].checked = "checked";
        for (let i = 0; i < len; i++) {
          if (localVariable[std_id].student[i].checked == "checked") {
            count++;
          }
        }
      } else {
        delete localVariable[std_id].student[name].checked;
      }
      if (len === count) {
        localVariable[std_id].checked = "checked";
      } else {
        delete localVariable[std_id].checked;
      }
    }
    setGettingData(localVariable);
  };

  return (
    <div>
      {gettingData.map((item) => {
        const { std_id } = item;
        return (
          <div key={std_id}>
            <ul style={{ listStyleType: "none" }}>
              <li style={{ marginLeft: "20px" }}>
                <input
                  type="checkbox"
                  id={std_id}
                  name={std_id}
                  value={std_id}
                  onChange={(e) =>
                    handler(e, std_id, (who = { press: "parent" }))
                  }
                  checked={item.checked == "checked" && `checked`}
                />
                <label for={item.std_id}>{item.std}</label>
              </li>

              {item.student.map((innerItem, index) => {
                return (
                  <ul key={index} style={{ listStyleType: "none" }}>
                    <li>
                      <input
                        type="checkbox"
                        id={innerItem.student_id}
                        name={innerItem.student_id}
                        value={innerItem.student_id}
                        onChange={(e) =>
                          handler(e, std_id, (who = { press: "child" }))
                        }
                        checked={innerItem.checked == "checked" && `checked`}
                      />
                      <label for={innerItem.student_id}>{innerItem.name}</label>
                    </li>
                  </ul>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
export default Main;
