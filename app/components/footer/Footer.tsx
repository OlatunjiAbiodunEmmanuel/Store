import React from "react";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href="#">1</Link>
            <Link href="#">2</Link>
            <Link href="#">3</Link>
            <Link href="#">4</Link>
            <Link href="#">5</Link>
            <Link href="#">6</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Services</h3>
            <Link href="#">1</Link>
            <Link href="#">2</Link>
            <Link href="#">3</Link>
            <Link href="#">4</Link>
            <Link href="#">5</Link>
            <Link href="#">6</Link>
          </FooterList>
          <div className="w-full md:1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Adipisci, quaerat ratione expedita voluptate delectus neque! Qui
              deserunt facilis placeat quod!
            </p>
            <p>
              &copy; {new Date().getFullYear()} Original Store. All right
              reserved
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook />
              </Link>
              <Link href="#">
                <MdFacebook />
              </Link>
              <Link href="#">
                <MdFacebook />
              </Link>
              <Link href="#">
                <MdFacebook />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
