import Head from "next/head";
import { NextPage } from "next";
import Header2 from "components/organisms/Header/Header2";
import H1anchor from "components/molecules/H1anchor";
import Footer from "components/organisms/Footer/Footer";
import ContactForm from "components/organisms/ContactForm/Container";

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gourami Engineering - Contact</title>
        <meta name="description" content="contact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header2 sticky={false} />

      <div className="max-w-screen-md mx-auto px-3 py-3 min-h-[calc(100vh_-_6rem)]">
        <div className="h-10" />
        <div className="text-center">
          <H1anchor text="CONTACT" />
        </div>
        <div className="h-10" />

        <p className="text-center text-gray-700 mb-10">
          本サイトに関するご質問やご依頼等は、下記問い合わせフォームよりお願いいたします。
        </p>

        <ContactForm />
      </div>

      <Footer />
    </>
  );
};

export default Contact;
