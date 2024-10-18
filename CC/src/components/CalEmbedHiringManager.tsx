'use client'
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function CalEmbedHiringManager() {
  useEffect(()=>{
    (async function () {
      const cal = await getCalApi({"namespace":"discuss-job-details"});
      cal("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  return <Cal namespace="discuss-job-details"
    calLink="andrew-schuessler-xrp0oa/discuss-job-details"
    style={{width:"100%",height:"100%",overflow:"scroll"}}
    config={{"layout":"month_view"}}
  
    
  />;
};
