import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Input, Radio } from "antd";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { getAddress, signTransaction, signMessage  } from "sats-connect";

function App() {
  const [ {ordinal} , dispatch] = useStateValue()
  const [state, setState] = useState('')

  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [publicKey, setPublicKey] = useState("");

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [network, setNetwork] = useState("livenet");

  let data = {
    "total":10,
    "list":[
      {
        inscriptionId: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0',
        inscriptionNumber: 959941,
        address: 'bc1q8h8s4zd9y0lkrx334aqnj4ykqs220ss735a3gh',
        outputValue: 546,
        preview: 'https://ordinals.com/preview/6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0',
        content: 'https://ordinals.com/content/6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0',
        contentLength: 53,
        contentType: 'text/plain;charset=utf-8',
        timestamp: 1680865285,
        genesisTransaction: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531',
        location: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531:0:0',
        output: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531:0',
        offset: 0
      }
    ]
  }
  
  const getBasicInfo = async () => {
    const unisat = window.unisat;
    const [address] = await unisat.getAccounts();
    setAddress(address);

    const publicKey = await unisat.getPublicKey();
    setPublicKey(publicKey);
    dispatch({
      type: actionType.SET_ORDINAL,
    ordinal: address
    })
    const balance = await unisat.getBalance();
    setBalance(balance);

    const res = await unisat.getInscriptions(0,10);
    

    const network = await unisat.getNetwork();
    setNetwork(network);
  };

  

  useEffect(() => {
  
  }, []);

 /*  if (!unisatInstalled) {
    return (
      <div >
          <div>
            <Button
          className="bg-black bg-opacity-80 border-2 border-orange-500 flex items-center font-bold px-6  py-2 text-white rounded-lg"
              onClick={() => {
                window.location.href = "https://unisat.io";
              }}
            >
              Install Unisat Wallet
            </Button>
          </div>
      
      </div>
    );
  } */
  const unisat = window.unisat;

  const test = async () => {
    const getAddressOptions = {
      payload: {
        purposes: ["ordinals", "payment"],
        message: "Address for receiving Ordinals",
        network: {
          type: "Mainnet",
        },
      },
      onFinish: (response) => {
        console.log(response)
        setConnected(true)
     setState({
          ordinalsAddress: response.addresses[0].address,
          paymentAddress: response.addresses[1].address,
        });

        dispatch({
          type: actionType.SET_ORDINAL,
        ordinal: response.addresses[0].address,
        })
      },
      onCancel: () => alert("Request canceled"),
    };
    await getAddress(getAddressOptions);
  };

  return (
    <div className="bg-black bg-opacity-80 border-2 border-orange-500 px-6  py-2 text-white rounded-lg text-[0.8rem] md:text-[1rem]">

     {/*    <p>Unisat Wallet</p> */}

        {connected ? (
        <p> { state && state.ordinalsAddress.substr(0,14)}... </p> 
        ) : (
          <div>
            <Button
            className="text-white border-none items-center font-bold "
            /*   onClick={async () => {
                const result = await unisat.requestAccounts();
                handleAccountsChanged(result);
              }} */
            onClick={() => test()}
            >
              Connect xVerse Wallet
            </Button>
          </div>
        )}
     
    </div>
  );
}


/* 
function SignMessageCard() {
  const [message, setMessage] = useState("hello world~");
  const [signature, setSignature] = useState("");
  return (
    <Card size="small" title="Sign Message" style={{ width: 300, margin: 10 }}>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>Message:</div>
        <Input
          defaultValue={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></Input>
      </div>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>Signature:</div>
        <div style={{ wordWrap: "break-word" }}>{signature}</div>
      </div>
      <Button
        style={{ marginTop: 10 }}
        onClick={async () => {
          const signature = await window.unisat.signMessage(message);
          setSignature(signature);
        }}
      >
        Sign Message
      </Button>
    </Card>
  );
} */


/* function SendBitcoin() {
  const [toAddress, setToAddress] = useState(
    "tb1qmfla5j7cpdvmswtruldgvjvk87yrflrfsf6hh0"
  );
  const [satoshis, setSatoshis] = useState(1000);
  const [txid, setTxid] = useState("");
  return (
    <Card size="small" title="Send Bitcoin" style={{ width: 300, margin: 10 }}>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>Receiver Address:</div>
        <Input
          defaultValue={toAddress}
          onChange={(e) => {
            setToAddress(e.target.value);
          }}
        ></Input>
      </div>

      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>Amount: (satoshis)</div>
        <Input
          defaultValue={satoshis}
          onChange={(e) => {
            setSatoshis(parseInt(e.target.value));
          }}
        ></Input>
      </div>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>txid:</div>
        <div style={{ wordWrap: "break-word" }}>{txid}</div>
      </div>
      <Button
        style={{ marginTop: 10 }}
        onClick={async () => {
          try {
            const txid = await window.unisat.sendBitcoin(
              toAddress,
              satoshis
            );
            setTxid(txid);
          } catch (e) {
            setTxid(e.message);
          }
        }}
      >
        SendBitcoin
      </Button>
    </Card>
  );
} */

export default App;
