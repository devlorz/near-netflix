import { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { utils } from "near-api-js";

import Header from "../../components/HeaderBrowse";
import { logout } from "../../utils";

import "./styles.css";

function Subscription() {
  const history = useHistory();
  const accountId = window.accountId;

  const [value, setValue] = useState("basic");

  useEffect(() => {
    if (!accountId) {
      history.push("/");
    }
  }, [accountId]);

  useEffect(() => {
    window.contract
      .get_account_outgoing_streams({
        account_id: accountId,
        from: 0,
        limit: 5,
      })
      .then((res) => {
        console.log(res);
        const found = res.find(
          (item) => item.receiver_id === "netflix.leelorz.testnet"
        );
        if (found) {
          history.push("/browse");
          window.location.reload();
        }
      });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onConfirm = async () => {
    if (value === "mobile") {
      await window.ftContract.ft_transfer_call(
        {
          receiver_id: "streaming-r-v2.dcversus.testnet",
          amount: "1000000000000000000000000", // 1 NEAR
          memo: "Roketo transfer",
          msg: JSON.stringify({
            Create: {
              request: {
                owner_id: accountId,
                receiver_id: "netflix.leelorz.testnet",
                tokens_per_sec: 385802469135802469, // 1 month for 1 NEAR
              },
            },
          }),
        },
        200000000000000,
        1
      );
    }
  };

  return (
    <div className="page">
      <Header black={true} onClick={logout} />
      <div
        style={{
          height: "calc(100vh - 70px)",
          marginTop: 70,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: 1024, display: "flex", flexDirection: "column" }}>
          <h1>Select Plan</h1>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="mobile"
                control={<Radio />}
                label="Mobile: Good video quality in SD (480p). Watch on any phone or tablet. Computer and TV not included. 1 Near/month"
              />
              <FormControlLabel
                value="basic"
                control={<Radio />}
                label="Basic: Good video quality in SD (480p). Watch on any phone, tablet, computer or TV. 2 Near/month"
              />
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label="Standard: Great video quality in Full HD (1080p). Watch on any phone, tablet, computer or TV. 3 Near/month"
              />
              <FormControlLabel
                value="premium"
                control={<Radio />}
                label="Premium: Our best video quality in Ultra HD (4K) and HDR. Watch on any phone, tablet, computer or TV. 4 Near/month"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            sx={{ alignSelf: "center", marginTop: "50px" }}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Subscription);
