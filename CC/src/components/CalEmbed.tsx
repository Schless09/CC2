'use client'
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function () {
  useEffect(()=>{
    (async function () {
      const cal = await getCalApi({"namespace":"20"});
      cal("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  return <Cal namespace="20"
    calLink="andrew-schuessler-xrp0oa/20"
    style={{width:"100%",height:"100%",overflow:"scroll"}}
    config={{"layout":"month_view"}}
  />;
};
