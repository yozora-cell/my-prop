import { useEffect, useState } from "react";
import { sha256 } from "js-sha256";
import JSONBig from "json-bigint";
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
import { EncryptedPacket } from "@pcd/passport-crypto";
import { Group } from "@semaphore-protocol/group";
import {
  FullProof,
  generateProof,
  Proof,
  verifyProof,
} from "@semaphore-protocol/proof";
import { SemaphoreIdentityPCDPackage } from "./InputTestPCD";
import { v4 as uuid } from "uuid";
/**
 * React hook that listens for PCDs and PendingPCDs from a passport popup window
 * using message passing and event listeners.
 */
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

/**
 * A react hook that sets up necessary passport popup logic on a specific route.
 * A popup page must be hosted on the website using the passport, as data can't
 * be passed between a website and a popup on a different origin like zupass.org.
 * This hook sends messages with a full client-side PCD or a server-side PendingPCD
 * that can be processed by the `usePassportPopupMessages` hook. PendingPCD requests
 * can further be processed by `usePendingPCD` and `usePCDMultiplexer`.
 */
export function usePassportPopupSetup() {
  // Usually this page redirects immediately. If not, show an error.
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.opener == null) {
      setError("Not a popup window");
      return;
    }

    const search = window.location.search;
    const params = new URLSearchParams(search);

    const paramsProofUrl = params.get("proofUrl");
    const paramsProof = params.get("proof");
    const paramsEncodingPendingPCD = params.get("encodedPendingPCD");

    // First, this page is window.open()-ed. Redirect to the Passport app.
    if (paramsProofUrl != null) {
      window.location.href = decodeURIComponent(paramsProofUrl);
    } else if (paramsProof != null) {
      // Later, the Passport redirects back with a proof. Send it to our parent.
      window.opener.postMessage({ encodedPCD: paramsProof }, "*");
      window.close();
    } else if (paramsEncodingPendingPCD != null) {
      // Later, the Passport redirects back with a encodedPendingPCD. Send it to our parent.
      window.opener.postMessage(
        { encodedPendingPCD: paramsEncodingPendingPCD },
        "*"
      );
      window.close();
    }
  }, []);

  return error;
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

export enum PCDRequestType {
  Get = "Get",
  Add = "Add",
}

export interface PCDRequest {
  returnUrl: string;
  type: PCDRequestType;
}

export interface GetRequestOptions {
  genericProveScreen?: boolean;
  title?: string;
  description?: string;
  debug?: boolean;
  proveOnServer?: boolean;
}

export interface PCDGetRequest<T extends PCDPackage = PCDPackage>
  extends PCDRequest {
  type: PCDRequestType.Get;
  pcdType: T["name"];
  args: ArgsOf<T>;
  options?: GetRequestOptions;
}

export interface PCDAddRequest extends PCDRequest {
  type: PCDRequestType.Add;
  pcd: PCD;
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

export function constructPassportPcdAddRequestUrl(
  passportOrigin: string,
  returnUrl: string,
  pcd: PCD
) {
  const req: PCDAddRequest = {
    type: PCDRequestType.Add,
    returnUrl: returnUrl,
    pcd,
  };
  return `${passportOrigin}?request=${JSON.stringify(req)}`;
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

export function useSerializedPCD<T extends PCDPackage>(
  proofPackage: T,
  serializedPCD: string
) {
  const [pcd, setPCD] = useState<PCDOf<T>>();

  useEffect(() => {
    if (serializedPCD) {
      const parsedPCD = JSON.parse(decodeURIComponent(serializedPCD));
      if (parsedPCD.type !== proofPackage.name) {
        return;
      }
      proofPackage.deserialize(parsedPCD.pcd).then((pcd) => {
        setPCD(pcd as any);
      });
    }
  }, [proofPackage, serializedPCD, setPCD]);

  return pcd;
}

export interface SemaphoreSignaturePCDClaim {
  /**
   * Pre-hashed message.
   */
  signedMessage: string;

  /**
   * Stringified `BigInt`.
   */
  identityCommitment: string;

  /**
   * Stringified `BigInt`.
   */
  nullifierHash: string;
}

export type SemaphoreSignaturePCDProof = Proof;

export interface SemaphoreSignaturePCDArgs {
  identity: PCDArgument<any>;
  signedMessage: StringArgument;
}

export interface SemaphoreSignaturePCDInitArgs {
  // TODO: how do we distribute these in-package, so that consumers
  // of the package don't have to copy-paste these artifacts?
  // TODO: how do we account for different versions of the same type
  // of artifact? eg. this one is parameterized by group size. Should
  // we pre-generate a bunch of artifacts per possible group size?
  // Should we do code-gen?
  zkeyFilePath: string;
  wasmFilePath: string;
}

let initArgs: SemaphoreSignaturePCDInitArgs | undefined = undefined;

export async function init(args: SemaphoreSignaturePCDInitArgs): Promise<void> {
  initArgs = args;
}

export function generateMessageHash(signal: string): bigint {
  // right shift to fit into a field element, which is 254 bits long
  // shift by 8 ensures we have a 253 bit element
  return BigInt("0x" + sha256(signal)) >> BigInt(8);
}

export const STATIC_SIGNATURE_PCD_NULLIFIER = generateMessageHash(
  "hardcoded-nullifier"
);

export class SemaphoreSignaturePCD
  implements PCD<SemaphoreSignaturePCDClaim, SemaphoreSignaturePCDProof>
{
  type = SemaphoreSignaturePCDTypeName;
  claim: SemaphoreSignaturePCDClaim;
  proof: SemaphoreSignaturePCDProof;
  id: string;

  public constructor(
    id: string,
    claim: SemaphoreSignaturePCDClaim,
    proof: SemaphoreSignaturePCDProof
  ) {
    this.id = id;
    this.claim = claim;
    this.proof = proof;
  }
}


export async function prove(args: SemaphoreSignaturePCDArgs): Promise<any> {
  if (!initArgs) {
    throw new Error(
      "cannot make semaphore signature proof: init has not been called yet"
    );
  }

  const serializedIdentityPCD = args.identity.value?.pcd;
  if (!serializedIdentityPCD) {
    throw new Error(
      "cannot make semaphore signature proof: identity is not set"
    );
  }
  const identityPCD = await SemaphoreIdentityPCDPackage.deserialize(
    serializedIdentityPCD
  );

  if (args.signedMessage.value === undefined) {
    throw new Error(
      "cannot make semaphore signature proof: signed message is not set"
    );
  }

  // Set up singleton group
  const group = new Group(1, 16);
  // @ts-ignore
  group.addMember(identityPCD.claim.identity.commitment);

  // Get Keccak256 hashed version of message for input into Semaphore
  const signal = generateMessageHash(args.signedMessage.value);

  // Set externalNullifier to be identity commitment to avoid nullifier
  // of other groups being exposed. This means that one must not use their
  // identity commitment as an externalNullifier for other groups, if they
  // wish to maintain anonymity.
  const fullProof = await generateProof(
    // @ts-ignore
    identityPCD.claim.identity,
    group,
    STATIC_SIGNATURE_PCD_NULLIFIER,
    signal,
    {
      zkeyFilePath: initArgs.zkeyFilePath,
      wasmFilePath: initArgs.wasmFilePath,
    }
  );

  const claim: SemaphoreSignaturePCDClaim = {
    // @ts-ignore
    identityCommitment: identityPCD.claim.identity.commitment.toString(),
    signedMessage: args.signedMessage.value,
    nullifierHash: fullProof.nullifierHash + "",
  };

  const proof: SemaphoreSignaturePCDProof = fullProof.proof;

  return new SemaphoreSignaturePCD(uuid(), claim, proof);
}

export async function verify(pcd: SemaphoreSignaturePCD): Promise<boolean> {
    // Set up singleton group
    const group = new Group(1, 16);
    group.addMember(pcd.claim.identityCommitment);
  
    // Convert PCD into Semaphore FullProof
    const fullProof: FullProof = {
      externalNullifier: STATIC_SIGNATURE_PCD_NULLIFIER,
      merkleTreeRoot: group.root + "",
      nullifierHash: pcd.claim.nullifierHash,
      proof: pcd.proof,
      signal: generateMessageHash(pcd.claim.signedMessage),
    };
  
    // check if proof is valid
    const validProof = await verifyProof(fullProof, 16);
  
    return validProof;
  }

  export async function serialize(
    pcd: SemaphoreSignaturePCD
  ): Promise<SerializedPCD<SemaphoreSignaturePCD>> {
    return {
      type: SemaphoreSignaturePCDTypeName,
      pcd: JSONBig().stringify(pcd),
    } as SerializedPCD<SemaphoreSignaturePCD>;
  }
  
  export async function deserialize(
    serialized: string
  ): Promise<SemaphoreSignaturePCD> {
    return JSONBig().parse(serialized);
  }
  

export const SemaphoreSignaturePCDPackage: PCDPackage<
  SemaphoreSignaturePCDClaim,
  SemaphoreSignaturePCDProof,
  SemaphoreSignaturePCDArgs,
  SemaphoreSignaturePCDInitArgs
> = {
  name: SemaphoreSignaturePCDTypeName,
  init,
  prove,
  verify,
  serialize,
  deserialize,
};

/**
 * React hook which can be used on 3rd party application websites that
 * parses and verifies a PCD representing a Semaphore signature proof.
 */
export function useSemaphoreSignatureProof(pcdStr: string) {
  const semaphoreSignaturePCD = useSerializedPCD(
    SemaphoreSignaturePCDPackage,
    pcdStr
  );

  // verify proof
  const [signatureProofValid, setValid] = useState<boolean | undefined>();
  useEffect(() => {
    if (semaphoreSignaturePCD) {
      const { verify } = SemaphoreSignaturePCDPackage;
      verify(semaphoreSignaturePCD).then((verified) => {
        setValid(verified);
      });
    }
  }, [semaphoreSignaturePCD]);

  return {
    signatureProof: semaphoreSignaturePCD,
    signatureProofValid,
  };
}

export interface ProveRequest {
  pcdType: string;
  args: any;
}

export interface ProveResponse {
  /**
   * JSON.stringify(SerializedPCD)
   */
  serializedPCD: string;
}
export interface VerifyRequest {
  pcdType: string;

  /**
   * JSON.stringify(SerializedPCD)
   */
  serializedPCD: string;
}

export interface VerifyResponse {
  verified: boolean;
}

export interface StatusRequest {
  hash: string;
}

export interface StatusResponse {
  status: PendingPCDStatus;

  /**
   * If status === COMPLETE, JSON.stringify(SerializedPCD), else undefined
   */
  serializedPCD: string | undefined;

  /**
   * If status === ERROR, error string from server, else undefined;
   */
  error: string | undefined;
}

export interface SupportedPCDsResponse {
  names: string[];
}

export interface SaveE2EERequest {
  /**
   * On the server-side, encrypted storage is keyed by the hash of
   * the encryption key.
   */
  blobKey: string;

  /**
   * An encrypted and stringified version of {@link EncryptedStorage}
   */
  encryptedBlob: string;
}

export interface SaveE2EEResponse {}

export interface LoadE2EERequest {
  /**
   * On the server-side, encrypted storage is keyed by the hash of
   * the encryption key.
   */
  blobKey: string;
}

export interface LoadE2EEResponse {
  /**
   * The encrypted storage of all the user's PCDs.
   */
  encryptedStorage: EncryptedPacket;
}

export function hashProveRequest(req: ProveRequest): string {
  const reqString = JSON.stringify(req);
  return sha256(reqString);
}

export interface PendingPCD {
  /**
   * Current status of the pending PCD using PendingPCDStatus enum.
   */
  status: PendingPCDStatus;

  /**
   * The type of PCD that a server is producing a proof for.
   */
  pcdType: string;

  /**
   * A hash of the ProveRequest using hashProveRequest. Stored to avoid
   * people re-sending the same request many times and clogging
   * the proving queue.
   */
  hash: string;
}

export enum PendingPCDStatus {
  QUEUED = "queued",
  PROVING = "proving",
  COMPLETE = "complete",
  ERROR = "error",
  NONE = "none",
}

/**
 * React hook that pings server on status of a PendingPCD. Returns a serialized
 * PCD when a completed PCD is returned, or the current status.
 */
export function usePendingPCD(
  pendingPCDStr: string,
  passportURL: string
): [PendingPCDStatus, string, string] {
  const [pendingPCDStatus, setPendingPCDStatus] = useState<PendingPCDStatus>(
    PendingPCDStatus.NONE
  );
  const [pendingPCDError, setPendingPCDError] = useState("");
  const [pcdStr, setPCDStr] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    const getStatus = () => {
      if (pendingPCDStr !== undefined && pendingPCDStr !== "") {
        const pendingPCD: PendingPCD = JSON.parse(pendingPCDStr);

        const request: StatusRequest = {
          hash: pendingPCD.hash,
        };

        fetch(`${passportURL}pcds/status`, {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((data: StatusResponse) => {
            setPendingPCDStatus(data.status);
            if (
              data.status === PendingPCDStatus.COMPLETE &&
              data.serializedPCD !== undefined
            ) {
              setPCDStr(data.serializedPCD);
              setPendingPCDError("");
              clearInterval(interval);
            } else if (
              data.status === PendingPCDStatus.ERROR &&
              data.error !== undefined
            ) {
              setPendingPCDError(data.error);
              clearInterval(interval);
            }
          })
          .catch((error) => {
            setPendingPCDStatus(PendingPCDStatus.ERROR);
            setPendingPCDError(error);
            clearInterval(interval);
          });
      }
    };

    interval = setInterval(getStatus, 1000);

    return () => clearInterval(interval);
  }, [pendingPCDStr, passportURL]);

  return [pendingPCDStatus, pendingPCDError, pcdStr];
}

/**
 * Multiplexer hook to choose between client-side and server-side PCDs.
 */
export function usePCDMultiplexer(
  passportPCDStr: string,
  serverPCDStr: string
): string {
  const [pcdStr, setPCDStr] = useState("");

  useEffect(() => {
    console.log(passportPCDStr);
    if (passportPCDStr) {
      setPCDStr(passportPCDStr);
    } else if (serverPCDStr) {
      setPCDStr(serverPCDStr);
    }
  }, [passportPCDStr, serverPCDStr]);

  return pcdStr;
}
