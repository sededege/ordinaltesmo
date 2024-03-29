/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { GiTwoCoins } from "react-icons/gi";
import Countdown from "react-countdown";
import { AnimatePresence, motion } from "framer-motion";
import {
  WalletDialogProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getAllUsuarios,
  updateNfts,
  updatePoints,
  getUser,
  saveUser,
} from "../utils/firebaseFunctions";
import Unisat from "../navs/Unisat";
import { Connection } from "@metaplex/js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import logo from "../img/logo.jpg";
import ProgressBar from "./ProgressBar";
import Overlay from "../img/ordinal.png";
import { hashlist } from "./hashlist";

const Ordinal = () => {
  const [{ cartShow, products, ordinal }, dispatch] = useStateValue();
  /* const ordinal =
    "bc1pjcnr0ts6mg3m8wf2qavzkj0a5n6uqrdaypdwvwsmz52gus0m3tqqh9w988"; */
  const [scrollValue] = useState(0);
  const [stake, setStake] = useState([]);
  const [select, setSelect] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState([]);
  const [claimed, setClaimed] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [nfts2, setNfts2] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [data1, setData] = useState([]);
  const [msg, setMsg] = useState(true);
  let qtyxhr = 150;
  let supply = 1020;
  const [update, setUpdate] = useState();
  let puntoss = 0;
  let thes = 0;
  let thes2 = 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const { publicKey } = useWallet();
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts =
    products && products.slice(firstPostIndex, lastPostIndex);

  const pointsearn2 = (a) => {
    /* let result = 10 */

    thes = thes + a;
  };

  let test = 0;
  const pointsearn3 = (a, points) => {
    const d = new Date();

    const fecha2 = parseInt(a);

    const fecha1 = Date.now();

    const diferenciaEnMilisegundos = Math.abs(fecha2 - fecha1);
    const diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60);

    const result = diferenciaEnHoras * (points / 24);
    /* const result = diferenciaEnHoras * (points / 1000); */
    /*  console.log(points) */
    /*     puntoss = puntoss + result;
     */

    thes2 = thes2 + Math.floor(result);
  };

  const fetchnfts = async (num) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Bearer 41d5a889-a8e6-4f4d-9183-4d594ca01992",
      },
      body: JSON.stringify({
        /*         ownerAccount: publicKey && publicKey.toBase58(),
         */ ownerAccount: "BggQ6E7ZUwxc6y1mJNXpb1fZC1tBiPtu6o4pWYRTvm6o",
        helloMoonCollectionId: "aec8c053152b2f1b7dc01db7e298d571",
        page: num,
      }),
    };

    const test = async (b, tokenAddress) => {
      const request = await fetch(b)
        .then((response) => response.json())
        .then((res) => {
          setNfts((prev) => [
            ...prev,
            { imageUrl: res.image, name: res.name, tokenAddress: tokenAddress },
          ]);
          setNfts2((prev) => [
            ...prev,
            { imageUrl: res.image, name: res.name, tokenAddress: tokenAddress },
          ]);
        });
    };
    fetch("https://rest-api.hellomoon.io/v0/nft/mints-by-owner", options)
      .then((response) => response.json())
      .then((res) => {
        res.data.map((a) => {
          /* setNfts((prev) => [...prev, a])
        setNfts2((prev) => [...prev, a]) */
          test(a.metadataJson.uri, a.nftMint);
        });
      })
      .catch((err) => console.error(err));

    /*  const body = {
      method: "qn_fetchNFTs",
      params: {
        wallet: publicKey && publicKey.toBase58(),
             wallet: "FKTA8fh6rhirjgjusihA2ctu6nKYdyWnHE95wqnEG3qq", 
        
     
        page: num,
        perPage: 40,
        omitFields: ['collectionName','traits','creators','provenance','network','chain']

      },
    };

    const options = {
      method: "POST",
      body: JSON.stringify(body),
    };
    const endpoints = [
      "https://evocative-orbital-forest.solana-mainnet.quiknode.pro/3a94816de54b8d84cb4122fc520302b9d204260a/",
      "https://newest-delicate-dust.solana-mainnet.quiknode.pro/cef8f3a8203547eb69213067965a2c7b2a6da64d/",
      "https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      "https://hidden-autumn-voice.solana-mainnet.quiknode.pro/a519e278a8928f5b2b64469b1839ecbb216c35c5/",
      "https://ancient-crimson-slug.solana-mainnet.quiknode.pro/f92fc31cc8ef023d25c0c6a1e234ed5a539c9c52/",
      "https://evocative-orbital-forest.solana-mainnet.quiknode.pro/3a94816de54b8d84cb4122fc520302b9d204260a/",
      "https://newest-delicate-dust.solana-mainnet.quiknode.pro/cef8f3a8203547eb69213067965a2c7b2a6da64d/",
      "https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      "https://hidden-autumn-voice.solana-mainnet.quiknode.pro/a519e278a8928f5b2b64469b1839ecbb216c35c5/",
      "https://ancient-crimson-slug.solana-mainnet.quiknode.pro/f92fc31cc8ef023d25c0c6a1e234ed5a539c9c52/",
      "https://evocative-orbital-forest.solana-mainnet.quiknode.pro/3a94816de54b8d84cb4122fc520302b9d204260a/",
      "https://newest-delicate-dust.solana-mainnet.quiknode.pro/cef8f3a8203547eb69213067965a2c7b2a6da64d/",
      "https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      "https://hidden-autumn-voice.solana-mainnet.quiknode.pro/a519e278a8928f5b2b64469b1839ecbb216c35c5/",
      "https://ancient-crimson-slug.solana-mainnet.quiknode.pro/f92fc31cc8ef023d25c0c6a1e234ed5a539c9c52/",
      "https://evocative-orbital-forest.solana-mainnet.quiknode.pro/3a94816de54b8d84cb4122fc520302b9d204260a/",
      "https://newest-delicate-dust.solana-mainnet.quiknode.pro/cef8f3a8203547eb69213067965a2c7b2a6da64d/",
      "https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      "https://hidden-autumn-voice.solana-mainnet.quiknode.pro/a519e278a8928f5b2b64469b1839ecbb216c35c5/",
      "https://ancient-crimson-slug.solana-mainnet.quiknode.pro/f92fc31cc8ef023d25c0c6a1e234ed5a539c9c52/",
      "https://evocative-orbital-forest.solana-mainnet.quiknode.pro/3a94816de54b8d84cb4122fc520302b9d204260a/",
      "https://newest-delicate-dust.solana-mainnet.quiknode.pro/cef8f3a8203547eb69213067965a2c7b2a6da64d/",
      "https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      "https://hidden-autumn-voice.solana-mainnet.quiknode.pro/a519e278a8928f5b2b64469b1839ecbb216c35c5/",
      "https://ancient-crimson-slug.solana-mainnet.quiknode.pro/f92fc31cc8ef023d25c0c6a1e234ed5a539c9c52/",
    ];

    return await fetch(endpoints[num], options)
      .then((res) => res.json())
      .then((res) => {
        return (
          res &&
          res.result &&
          res.result.assets
            .filter(
              (b) =>
                b.collectionAddress ===
                "HNvbqajUp8tYYRRBwm4cqeRQRbahLLTSLdvgi6QzM4cB"
            ) .map((a) => {
              setNfts((prev) => [...prev, a]);
              setNfts2((prev) => [...prev, a]);
            })
        );
      }); */
  };

  const checkuser = async (a) => {
    const res = await getUser(a);
    if (res) {
      return res;
    } else {
      const dataa = {
        id: ordinal && ordinal,
        snapshot: `${Date.now()}`,
        nickname: "test",
        points: 0,
        twitter: null,
        discord: null,
        staked: [],
      };
      saveUser(dataa);

      return await getUser(a);
    }
  };

  let data = {
    total: 10,
    list: [
      {
        inscriptionId:
          "6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0",
        inscriptionNumber: 959941,
        address: "bc1q8h8s4zd9y0lkrx334aqnj4ykqs220ss735a3gh",
        outputValue: 546,
        preview:
          "https://ordinals.com/preview/6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0",
        content:
          "https://ordinals.com/content/6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0",
        contentLength: 53,
        contentType: "text/plain;charset=utf-8",
        timestamp: 1680865285,
        genesisTransaction:
          "6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531",
        location:
          "6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531:0:0",
        output:
          "6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531:0",
        offset: 0,
      },
    ],
  };

  useEffect(() => {
  

    const first = async () => {
      setAllUsers(await getAllUsuarios());
    };
    first();
    const asd = async () => {
      const test2 = await checkuser(ordinal && ordinal);
      setUser(test2);
      setStake(test2.staked);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);
    setLoading(false);

    ordinal ? asd() : setLoading(false);

    const fetchData = async () => {
      setNfts([]);
      setNfts2([]);

      try {
        const offset = 1;
        const response = await fetch(
          `https://api.hiro.so/ordinals/v1/inscriptions?address=${ordinal}&limit=60`,
          {
            offset: 10,
          }
        );
        const jsonData = await response.json();
        console.log(jsonData);
        jsonData.results.map((a) => {
          if (hashlist.includes(a.id)) {
            setNfts((prev) => [
              ...prev,
              {
                id: a.id,
                imageUrl: `https://ord-mirror.magiceden.dev/content/${a.id}`,
                name: a.number,
                tokenAddress: a.number,
              },
            ]);

            setNfts2((prev) => [
              ...prev,
              {
                id: a.id,
                imageUrl: `https://ord-mirror.magiceden.dev/content/${a.id}`,
                name: a.number,
                tokenAddress: a.number,
              },
            ]);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ordinal]);

  const updatestake = (a) => {
    let result = [];

    a &&
      a.forEach((e) =>
        nfts2.find((f) => f.tokenAddress === e.tokenAddress)
          ? result.push(e)
          : null
      );
    return result;
  };

  console.log(nfts);
  const pointsearn = (a, points) => {
    const d = new Date();

    const fecha2 = parseInt(a);

    const fecha1 = Date.now();

    const diferenciaEnMilisegundos = Math.abs(fecha2 - fecha1);
    const diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60);

    const result = diferenciaEnHoras * (points / 24);

    /*     console.log('puntos',puntoss)
     */
    puntoss = puntoss + result;

    /* 
    console.log('puntos',puntoss)
    console.log('userpoints', user.points) */
  };

  const hours = (a) => {
    const d = new Date();

    const fecha2 = parseInt(a);

    const fecha1 = Date.now();

    const diferenciaEnMilisegundos = Math.abs(fecha2 - fecha1);
    const diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60);

    return diferenciaEnHoras;
  };

  const sendtostake = (a) => {
    if (a === "all") {
      const tostake = filtrar(stake).map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: qtyxhr,
      }));

      const dataa = {
        id: ordinal && ordinal,
        staked: tostake.concat(stake),
        snapshot: user.staked.length > 0 ? user.snapshot : `${Date.now()}`,
      };

      updateNfts(dataa);
      setStake(tostake.concat(stake));
      setUpdate(!update);
    } else if (a === "unstakeall") {
      stake && stake.map((e) => setNfts((prev) => [...prev, e]));
      const dataa = {
        id: ordinal && ordinal,
        staked: [],
        snapshot: `${Date.now()}`,
      };
      updateNfts(dataa);
      setStake([]);
    } else if (a === "claimall") {
      let result = [];
      updatestake(stake).map((a) => pointsearn(a.snapshot, 150));
      setClaimed(true);

      nfts2.forEach((e) =>
        stake.find((f) => f.tokenAddress === e.tokenAddress)
          ? result.push(e)
          : null
      );

      const tostake2 = result.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: qtyxhr,
        /*         blocknumber: a.provenance[0].blockNumber,
         */
      }));

      console.log(nfts2);
      const data2 = {
        id: ordinal && ordinal,
        staked: tostake2,
        snapshot: `${Date.now()}`,
      };

      const datapoints = {
        id: ordinal && ordinal,
        points: Math.floor(parseInt(user.points)) + puntoss,
      };

      updateNfts(data2);
      updatePoints(datapoints);
    } else if (a === "claimdiamond") {
      let result = [];
      updatestake(stake).map((a) => pointsearn(a.snapshot, 150));
      setClaimed(true);

      nfts2.forEach((e) =>
        stake.find((f) => f.tokenAddress === e.tokenAddress)
          ? result.push(e)
          : null
      );

      const tostake2 = result.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: qtyxhr,
        /*         blocknumber: a.provenance[0].blockNumber,
         */
      }));

      const data2 = {
        id: ordinal && ordinal,
        staked: tostake2,
        snapshot: `${Date.now()}`,
      };

      const datapoints = {
        id: ordinal && ordinal,
        diamondpoints: user?.diamondpoints + 1,
      };
      updateNfts(data2);
      updatePoints(datapoints);
    } else {
      setUpdate(!update);
      setNfts(nfts.filter((el) => !select.includes(el)));
      const tostake = select.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: qtyxhr,
        /*  blocknumber: a.provenance[0].blockNumber, */
      }));

      const dataa = {
        id: ordinal && ordinal,
        staked: tostake.concat(stake),
        snapshot: user.staked.length > 0 ? user.snapshot : `${Date.now()}`,
      };
      updateNfts(dataa);
      setStake(tostake.concat(stake));
    }
    /* setStaking(true); */
    setSelect([]);
    setSelect2([]);
    const asd = async () => {
      setAllUsers(await getAllUsuarios());
    };
    asd();
    /* router.push("/stake"); */
  };
  const addToStake = (a) => {
    if (select.filter((b) => b.tokenAddress === a.tokenAddress).length > 0) {
      setSelect(select.filter((b) => b.tokenAddress !== a.tokenAddress));
    } else {
      setSelect([...select, a]);
    }
  };
  const [progress, setProgress] = useState(0);

  const filtrar = (b) => {
    let result = [];

    // Find unique elements in arr1 & push them into result
    b &&
      nfts2.forEach((e) =>
        b.find((f) => f.tokenAddress === e.tokenAddress) ? null : result.push(e)
      );

    // Find unique elements in arr2 & push them into result
    /*  arr2.forEach((e) => (arr1.find((f) => f === e) ? null : result.push(e))); */

    return result;
  };

  let totalstaked = 0;
  const calculatestake = (a) => {
    totalstaked = totalstaked + a;
  };

  return (
    <div className="w-full flex overflow-auto h-[80vh] md:px-40 mt-4  ">
      <img
        className="md:h-full h-[200vh] object-cover w-full absolute z-10 top-0 left-0 pointer-events-none"
        src={Overlay}
        alt="overlay"
      />
      <div className="flex absolute z-20  h-[80vh] left-0 md:px-40  flex-col w-full ">
        {loading ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-screen flex h-screen bg-[#FE4802] z-[8000] left-0 top-0 justify-center items-center flex-col fixed"
              role="status"
            >
              <img src={logo} alt="logo" className="w-14" />
              <svg
                aria-hidden="true"
                className="inline w-24 h-24 text-gray-400 animate-spin dark:text-white fill-tesmo absolute"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            <div className="px-4 md:px-0">
              <div className="w-full  flex items-center flex-col gap-2 mb-4 bg-tesmo bg-opacity-80 rounded-lg px-4 py-2 shadow-orange-700 shadow-lg">
                {/*           <h1 className="text-white menu text-[1rem] font ">Vault</h1>
                 */}{" "}
                {allusers &&
                  allusers.map(
                    (b) => b.staked && calculatestake(b.staked.length)
                  )}
                <p className="text-slate-300 font ">
                  {totalstaked > 0
                    ? Math.round((100 * totalstaked) / supply)
                    : 0}{" "}
                  %
                </p>
                <ProgressBar
                  state="orange"
                  progress={
                    totalstaked > 0
                      ? Math.round((100 * totalstaked) / supply)
                      : 0
                  }
                />
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-full background">
              <div className="w-full h-full px-4 md:px-0 flex flex-col md:flex-row gap-10 ">
                <div className="flex flex-col w-full ">
                  <div className="flex justify-between p-6 mb-4 h-[80px] bg-tesmo bg-opacity-80 shadow-slate-700 shadow-lg rounded-lg items-center">
                    <h1 className=" text-[0.8rem] lg:text-[1rem] text-slate-300 font">
                      UnLocked: {stake && filtrar(stake).length}
                    </h1>

                    <div className="flex flex-col md:flex-row md:gap-2">
                      <h2 className="text-slate-300 font text-[0.8rem] lg:text-[1rem]">
                        Balance
                      </h2>
                      <div className="flex  items-center gap-2 ">
                        <GiTwoCoins className="text-yellow-300 font text-[0.8rem] lg:text-[1rem]" />
                        <p className="text-yellow-500 font text-[0.8rem] lg:text-[1rem]">
                          {" "}
                          {user ? Math.round(user.points) : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="shadow-lg relative shadow-slate-700 p-4 bg-tesmo bg-opacity-80 rounded-lg h-[580px] md:w-full md:h-full">
                    <div className=" grid grid-cols-3 h-[465px] md:grid-cols-3  lg:grid-cols-4 gap-2 md:h-[42vh]  xl:h-[42vh] 2xl:h-[50vh] 2xl:grid-cols-5 overflow-auto">
                      {nfts.length > 0 ? (
                        /*  filtrar(stake).map((a, index) */
                        filtrar(stake).map((a, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              ease: "easeOut",
                              duration: 0.5,
                              delay: 0.3 + index / 5,
                            }}
                            onClick={() => addToStake(a)}
                            className={`${
                              select.includes(a)
                                ? " shadow-md bg-tesmo shadow-orange-500"
                                : "bg-tesmo"
                            }  mx-auto transition-all 2s ease-in border-[1px] hover:shadow-md hover:shadow-orange-500 border-tesmo  cursor-pointer  h-[160px] md:h-[120px] lg:h-[11vw]  hover:bg-tesmo2  p-2 rounded-lg`}
                          >
                            <img
                              className="w-[100px] object-contain mx-auto rounded-lg"
                              src={`https://img-cdn.magiceden.dev/plain/https%3A%2F%2Frenderer.magiceden.workers.dev%2F%3Furl%3Dhttps%3A%2F%2Ford-mirror.magiceden.dev%2Fcontent%2F${a.id}`}
                              alt="nft"
                            />

                            <p className="text-white text-center text-[0.9rem] mt-2">
                              {a.name}
                            </p>
                            <div className="text-center text-yellow-300  text-[0.7rem] font-bold flex justify-center  items-center gap-2 ">
                              <GiTwoCoins /> {qtyxhr}{" "}
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="w-full h-full col-span-5 justify-center flex items-center">
                          {loading ? (
                            <div role="status">
                              <svg
                                aria-hidden="true"
                                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            ordinal && (
                              <div className="flex flex-col text-white w-[200px] text-center gap-4">
                                You don't have any Thesmophoria NFT.
                                <a
                                  href="https://magiceden.io/marketplace/tesmophoria"
                                  className="p-2 bg-orange-500 rounded-lg"
                                >
                                  Enter on Valhalla.
                                </a>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row h-[100px] justify-between p-6 mt-4 bg-tesmo bg-opacity-80 shadow-slate-700 border-2 border-slate-700 rounded-lg items-center absolute bottom-0 left-0 w-full">
                      <div className="flex items-center">
                        <h1 className=" text-[1.2rem] text-slate-300 font">
                          Selected:{" "}
                        </h1>
                        <h1 className=" text-[1.2rem] text-slate-300 font ml-2">
                          {select.length}
                        </h1>
                      </div>
                      <div className="flex items-center gap-2 ">
                        {/*     <button
                          onClick={() => sendtostake()}
                          className="text-white px-8 py-2 hidden lg:flex  rounded-lg border-2 font border-btn hover:bg-white hover:text-btn bg-btn cursor-pointer text-[1rem]"
                        >
                          Lock
                        </button> */}
                        <button
                          onClick={() => sendtostake("all")}
                          className="text-white px-8 py-2 rounded-lg md:text-[0.8rem] 2xl:text-[1rem] border-2 font border-orange-500 hover:bg-white hover:text-orange-500 bg-orange-500 cursor-pointer text-[1rem]"
                        >
                          Lock All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full ">
                  <div className="flex justify-between h-[80px] p-6 mb-4 shadow-slate-700 bg-tesmo bg-opacity-80 shadow-lg rounded-lg items-center">
                    <h1 className=" text-[0.8rem] lg:text-[1rem] text-slate-300 font">
                      Locked: {updatestake(stake).length}
                    </h1>
                    {/*  <div className="flex-col flex">
                      <h2 className="text-slate-600 font text-[1.4rem]">
                        Earning
                      </h2>
                      <div className="flex  items-center gap-2">
                        <GiTwoCoins className="text-purple-400 font text-[1.4rem]" />
                        <p className="text-purple-400 font text-[1.4rem]">
                          {updatestake(stake).map((a) =>
                            pointsearn(a.snapshot)
                          )}
                          {puntoss.toFixed(2)}
                        </p>
                      </div>
                    </div> */}

                    {hours(user && user.snapshot) >= 24 ? (
                      claimed ? (
                        <button className="text-white px-2 md:px-8 py-2 rounded-lg border-2 border-slate-700 hover:bg-white hover:text-slate-700 bg-slate-700 cursor-pointer font text-[1rem]">
                          Claimed
                        </button>
                      ) : (
                        <div>
                          <button
                            onClick={() => sendtostake("claimall")}
                            className="text-tesmo px-2 md:px-8 py-2 rounded-lg border-2 border-slate-700 hover:bg-white hover:text-slate-700 bg-yellow-300 cursor-pointer font text-[0.8rem] lg:text-[1rem]"
                          >
                            Claim all
                          </button>
                        </div>
                      )
                    ) : (
                      stake &&
                      stake.length > 0 && (
                        <div className="">
                          <div className="flex gap-2 text-tesmo2 items-center justify-center">
                            <GiTwoCoins className="text-yellow-300 font text-[1.4rem]" />

                            <p className=" text-[1.2rem] text-slate-400 font">
                              Claim in
                            </p>

                            <Countdown
                              className="text-orange-500"
                              date={parseInt(user && user.snapshot) + 86400000}
                            />
                          </div>
                          {/*  <div className="flex gap-2 text-tesmo2 items-center justify-center">
                            <GiTwoCoins className="text-sky-500 font text-[1.4rem]" />

                            <p className=" text-[1.2rem] text-slate-400 font">
                              Claim in
                            </p>
                            <Countdown
                              className="text-purple-500"
                              date={parseInt(user && user.snapshot) + 86400000}
                            />
                          </div> */}
                        </div>
                      )
                    )}
                  </div>
                  <div className="shadow-lg relative shadow-slate-700 p-4 bg-tesmo bg-opacity-80 rounded-lg h-[580px] md:w-full md:h-full">
                    <div className=" grid grid-cols-3 h-[465px] md:grid-cols-3  lg:grid-cols-4 gap-2 md:h-[42vh]  xl:h-[42vh] 2xl:h-[50vh] 2xl:grid-cols-5 overflow-auto">
                      {ordinal && nfts.length > 0 ? (
                        updatestake(stake).map((a, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              ease: "easeOut",
                              duration: 0.5,
                              delay: 0.3 + index / 5,
                            }}
                            className={`${
                              select.includes(a)
                                ? "bg-tesmo2 border-2 border-slate-200"
                                : "bg-tesmo"
                            }  mx-auto transition-all 2s ease-in border-[1px] border-tesmo cursor-pointer   h-[160px] md:h-[120px] lg:h-[11vw]   hover:bg-tesmo2  p-2 rounded-lg`}
                          >
                           <img
                              className="w-[100px] object-contain mx-auto rounded-lg"
                              src={`https://img-cdn.magiceden.dev/plain/https%3A%2F%2Frenderer.magiceden.workers.dev%2F%3Furl%3Dhttps%3A%2F%2Ford-mirror.magiceden.dev%2Fcontent%2F${a.id}`}
                              alt="nft"
                            />
                            <p className="text-white text-center text-[0.8rem] mt-2">
                              {a.name}
                            </p>
                            <div className="text-center text-yellow-300 font-bold flex justify-center  items-center gap-2 ">
                              <GiTwoCoins />{" "}
                              <p className="text-yellow-500 font text-[1rem]">
                                150
                              </p>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="w-full h-full col-span-5 justify-center flex items-center">
                          {loading ? (
                            <div role="status">
                              <svg
                                aria-hidden="true"
                                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span class="sr-only">Loading...</span>
                            </div>
                          ) : (
                            ordinal && (
                              <div className="flex flex-col text-white w-[200px] text-center gap-4">
                                You don't have any Thesmophoria Ordinal NFT.
                                <a
                                  href="https://magiceden.io/marketplace/tesmophoria"
                                  className="p-2 bg-orange-500 rounded-lg"
                                >
                                  Enter on Valhalla.
                                </a>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex h-[100px] justify-between p-6 mt-4 bg-tesmo bg-opacity-80 shadow-slate-700 border-2 border-slate-700 rounded-lg items-center absolute bottom-0 left-0 w-full">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => sendtostake("unstakeall")}
                          className="text-white px-8 py-2 rounded-lg border-2 border-orange-500 font md:text-[0.6rem] lg:text-[0.8rem] 2xl:text-[1rem] hover:bg-white hover:text-orange-500 bg-black bg-opacity-80 cursor-pointer text-[1em]"
                        >
                          UnLock All
                        </button>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex  items-center gap-2 text-[1rem] 2xl:text-[1rem]  ">
                          <GiTwoCoins className="text-yellow-300 font " />
                          <p className="text-yellow-500 font ">
                            {stake &&
                              updatestake(stake).map((a) =>
                                pointsearn2(150)
                              )}
                            {thes} <span className="text-white ">/ day</span>
                          </p>
                        </div>
                        <div className="text-center text-yellow-500 font  font-bold flex justify-center  items-center gap-2  text-[1rem] 2xl:text-[1rem]  ">
                          {stake &&
                            updatestake(stake).map((a) =>
                              pointsearn3(a.snapshot, 150)
                            )}
                          <p className="text-white">Total:</p>
                          <GiTwoCoins /> <p> {thes2} </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*  <div className="w-full h-[60vh] text-white justify-center flex items-center flex-col text-[1.6rem] md:text-[2rem] menu">
          <p>The raffle will be held in</p>
          <Countdown date={Date.now() + 80000000} />
          <div className="mt-20 text-center">
            <p className="text-white font text-[1rem]">
              Prize: 1 Thesmophoria nft
            </p>
            <p className="text-white font text-[1rem]">
              Only to <span className="font-bold">delisted</span> holders.
            </p>
            <p className="text-white font text-[1rem] underline">
              Snapshot at any time
            </p>
            <p className="text-white font text-[1rem]">
              Buy your tickets{" "}
              <a
                href="https://magiceden.io/marketplace/tesmophoria"
                className="text-pink-500 font-bold"
              >
                Magic Eden
              </a>
              .
            </p>
          </div>
        </div> */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Ordinal;
