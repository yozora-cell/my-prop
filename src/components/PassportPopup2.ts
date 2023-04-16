import { useEffect, useState } from "react";
import {
  ArgsOf,
  PCD,
  PCDPackage,
  ArgumentTypeName,
  PCDOf,
  PCDArgument,
  StringArgument,
  SerializedPCD
} from "@pcd/pcd-types";
export interface GetRequestOptions {
  genericProveScreen?: boolean;
  title?: string;
  description?: string;
  debug?: boolean;
  proveOnServer?: boolean;
}

export enum PCDRequestType {
  Get = "Get",
  Add = "Add",
}

export interface PCDRequest {
  returnUrl: string;
  type: PCDRequestType;
}

export interface PCDGetRequest<T extends PCDPackage = PCDPackage>
  extends PCDRequest {
  type: PCDRequestType.Get;
  pcdType: T["name"];
  args: ArgsOf<T>;
  options?: GetRequestOptions;
}

export function constructPassportPcdGetRequestUrl<T extends PCDPackage>(
  passportOrigin: string,
  returnUrl: string,
  pcdType: T["name"],
  args: ArgsOf<T>,
  options?: GetRequestOptions
) {
  const req: PCDGetRequest<T> = {
    type: PCDRequestType.Get,
    returnUrl: returnUrl,
    args: args,
    pcdType,
    options,
  };
  const encReq = encodeURIComponent(JSON.stringify(req));
  return `${passportOrigin}#/prove?request=${encReq}`;
}

export const SemaphoreSignaturePCDTypeName = "semaphore-signature-pcd";

export function openSemaphoreSignaturePopup(
  urlToPassportWebsite: string,
  popupUrl: string,
  messageToSign: string,
  proveOnServer?: boolean
) {
  const proofUrl = constructPassportPcdGetRequestUrl<any>(
    urlToPassportWebsite,
    popupUrl,
    SemaphoreSignaturePCDTypeName,
    {
      identity: {
        argumentType: ArgumentTypeName.PCD,
        value: undefined,
        userProvided: true,
      },
      signedMessage: {
        argumentType: ArgumentTypeName.String,
        value: messageToSign,
        userProvided: false,
      },
    },
    {
      proveOnServer: proveOnServer,
    }
  );

  openPassportPopup(popupUrl, proofUrl);
}

/**
 * Open up a passport popup window using proofUrl from specific PCD integrations
 * and popupUrl, which is the route where the usePassportPopupSetup hook is being
 * served from.
 */
export function openPassportPopup(popupUrl: string, proofUrl: string) {
  const url = `${popupUrl}?proofUrl=${encodeURIComponent(proofUrl)}`;
  console.log("url", url)
  window.open(url, "_blank", "width=360,height=480,top=100,popup");
}


export function usePassportPopupMessages() {
  const [pcdStr, setPCDStr] = useState("");
  const [pendingPCDStr, setPendingPCDStr] = useState("");

  // Listen for PCDs coming back from the Passport popup
  useEffect(() => {
    function receiveMessage(ev: MessageEvent<any>) {
      // Extensions including Metamask apparently send messages to every page. Ignore those.
      if (ev.data.encodedPCD) {
        console.log("Received PCD", ev.data.encodedPCD);
        setPCDStr(ev.data.encodedPCD);
      } else if (ev.data.encodedPendingPCD) {
        console.log(ev.data);
        setPendingPCDStr(ev.data.encodedPendingPCD);
      }
    }
    window.addEventListener("message", receiveMessage, false);
    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  return [pcdStr, pendingPCDStr];
}