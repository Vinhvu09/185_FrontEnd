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
  const { unityProvider, unload } = useUnityContext({
    loaderUrl: buildUrl + url + ".loader.js",
    dataUrl: buildUrl + url + ".data.gz",
    frameworkUrl: buildUrl + url + ".framework.js.gz",
    codeUrl: buildUrl + url + ".wasm.gz",
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

  return (
    <Unity
      unityProvider={unityProvider}
      devicePixelRatio={2}
      style={{
        height: 1000,
        width: 1000,
      }}
    />
  );
});

const Image3D = () => {
  const ref = useRef(null);
  const [nav, setNav] = useState([
    {
      label: "HackerHome",
      name: "HackerHome",
    },
    {
      label: "ngoMonHue",
      name: "ngoMonHue",
    },
    {
      label: "Lotus",
      name: "Lotus",
    },
  ]);

  const [item, setItem] = useState(nav[0]);
  console.log(item);

  return (
    <>
      <ul style={{ display: "flex" }}>
        {nav.map((x, idx) => (
          <li
            key={`${x.name}-${idx}`}
            style={{
              padding: 20,
              border: "1px solid",
            }}
            onClick={async () => {
              await ref.current.unloadInstance();
              setItem(x);
            }}
          >
            {x.label}
          </li>
        ))}
      </ul>
      <UnityComponent ref={ref} key={`${item.name}`} url={item.name} />
    </>
  );
};

export default Image3D;
