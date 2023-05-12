import { getAxios } from "api/Axios";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const buildUrl = "http://127.0.0.1:4000/";

const UnityComponent = forwardRef(function ({ url }, ref) {
  const { unityProvider, unload, UNSAFE__detachAndUnloadImmediate } =
    useUnityContext({
      loaderUrl: buildUrl + url + "/" + url + ".loader.js",
      dataUrl: buildUrl + url + "/" + url + ".data.br",
      frameworkUrl: buildUrl + url + "/" + url + ".framework.js.br",
      codeUrl: buildUrl + url + "/" + url + ".wasm.br",
      companyName: "Đại Quốc Việt",
      productName: "Admin dashboard",
      productVersion: "1.0",
    });

  useImperativeHandle(
    ref,
    () => {
      return {
        unloadInstance: async () => {
          await unload();
        },
      };
    },
    [unload]
  );

  useEffect(() => {
    return () => {
      UNSAFE__detachAndUnloadImmediate();
    };
  }, [UNSAFE__detachAndUnloadImmediate]);

  return (
    <Unity
      unityProvider={unityProvider}
      devicePixelRatio={4}
      style={{
        height: "100%",
        width: "100%",
      }}
    />
  );
});

const Image3D = () => {
  const ref = useRef(null);
  const [nav, setNav] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    getAxios("/artefact/folder-path").then((res) => {
      if (res?.status === "success") {
        setNav(res.data);
        setData(res.data[0]);
      }
    });
  }, []);

  return (
    <>
      <ul style={{ display: "flex" }}>
        {nav.map((x, idx) => (
          <li
            key={`${x}-${idx}`}
            style={{
              padding: 20,
              border: "1px solid",
            }}
            onClick={async () => {
              if (ref.current) {
                await ref.current.unloadInstance();
              }
              setData(x);
            }}
          >
            {x}
          </li>
        ))}
      </ul>
      {data && <UnityComponent ref={ref} key={`${data}`} url={data} />}
    </>
  );
};

export default Image3D;
