import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openOAuthPopup = (
  url: string,
  name: string,
  width = 600,
  height = 700,
): Promise<{ code: string | null; id_token: string | null }> => {
  return new Promise((resolve, reject) => {
    // Center the popup
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = 50 + window.screenY + (window.innerHeight - height) / 2;

    const popup = window.open(
      url,
      name,
      `width=${width},height=${height},top=${top},left=${left}`,
    );

    if (!popup) {
      reject("Popup blocked or not allowed");
      return;
    }

    const interval = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(interval);
          resolve({ code: null, id_token: null });
        }

        if (popup.location?.hash) {
          const params = new URLSearchParams(popup.location?.hash.substring(1)); // Remove the '#' character
          const code = params.get("code");
          const id_token = params.get("id_token");

          if (code && id_token) {
            popup.close();
            clearInterval(interval);
            resolve({ code, id_token });
          }
        }
      } catch (error) {}
    }, 500);
  });
};

export function camelCaseToWord(camel: string) {
  return camel.replace(/([A-Z])/g, " $1");
}
