import ContactForm from "@/components/ContactForm";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function Contact() {
    return (
        <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: "head",
        }}
      >
        <ContactForm />
        </GoogleReCaptchaProvider>
    );
}