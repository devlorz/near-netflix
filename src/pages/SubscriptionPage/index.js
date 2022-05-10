import { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { utils } from "near-api-js";
import BigNumber from "bignumber.js";

import Header from "../../components/HeaderBrowse";
import { logout } from "../../utils";

import "./styles.css";
import { Box } from "@mui/system";

function Subscription() {
  const history = useHistory();
  const accountId = window.accountId;

  const [value, setValue] = useState("basic");
  const [mode, setMode] = useState("not-subscribed");
  const [streamId, setStreamId] = useState();
  const [wNearTotal, setwNearTotal] = useState("0");
  const [wNearAmount, setWNearAmount] = useState("1");

  useEffect(() => {
    if (!accountId) {
      history.push("/");
    }
  }, [accountId]);

  useEffect(() => {
    if (accountId) {
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
            setStreamId(found.id);
            if (found.status === "Active") {
              history.push("/browse");
              window.location.reload();
            } else if (found.status === "Paused") {
              setMode("paused");
            }
          }
        });
    }
  }, [accountId]);

  useEffect(() => {
    if (accountId) {
      window.ftContract.ft_balance_of({ account_id: accountId }).then((res) => {
        console.log(
          new BigNumber(utils.format.formatNearAmount(res)).toFixed(2)
        );
        setwNearTotal(
          new BigNumber(utils.format.formatNearAmount(res)).toFixed(2)
        );
      });
    }
  }, [accountId]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onConfirm = async () => {
    let amount = 1;
    if (value === "basic") {
      amount = 2;
    } else if (value === "standard") {
      amount = 3;
    } else if (value === "premium") {
      amount = 4;
    }
    console.log(utils.format.parseNearAmount(amount.toString()));
    await window.ftContract.ft_transfer_call(
      {
        receiver_id: "streaming-r-v2.dcversus.testnet",
        amount: utils.format.parseNearAmount(amount.toString()), // 1 NEAR
        memo: "Roketo transfer",
        msg: JSON.stringify({
          Create: {
            request: {
              owner_id: accountId,
              receiver_id: "netflix.leelorz.testnet",
              tokens_per_sec: amount * 385802469135802469, // 1 month for 1 NEAR
            },
          },
        }),
      },
      200000000000000,
      1
    );
  };

  const onRestart = async () => {
    await window.contract.start_stream(
      {
        stream_id: streamId,
      },
      200000000000000,
      1
    );
  };

  const wrapNear = async () => {
    await window.ftContract.near_deposit(
      {},
      200000000000000,
      utils.format.parseNearAmount(wNearAmount)
    );
  };

  return (
    <div className="container">
      <Header black={true} logout={logout} />
      <div
        style={{
          height: "calc(100vh - 70px)",
          marginTop: 70,
          display: "flex",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          style={{
            width: 1024,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {mode === "not-subscribed" && (
            <>
              <Box
                sx={{
                  marginRight: "10px",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                You have total {wNearTotal} wNEAR
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <input
                    autoComplete="off"
                    value={wNearAmount}
                    max="100"
                    min="1"
                    step="1"
                    type="number"
                    onChange={(e) => setWNearAmount(e.target.value)}
                  />

                  <Button
                    variant="contained"
                    sx={{ marginRight: "10px" }}
                    onClick={wrapNear}
                  >
                    Wrap Near
                  </Button>
                </div>
              </Box>
              <h1>Select Plan Cancel Anytime</h1>
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
                sx={{ alignSelf: "center", marginTop: "50px" }}
                variant="contained"
                onClick={onConfirm}
              >
                Confirm
              </Button>
            </>
          )}
          {mode === "paused" && (
            <>
              <h1>Restart Subscription</h1>
              <Button
                variant="contained"
                sx={{ alignSelf: "center", marginTop: "50px" }}
                onClick={onRestart}
              >
                Confirm
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Subscription);
