import Image from 'next/image'
import { Inter } from 'next/font/google'
import portfolioPic from "../public/images/IMG_7265.PNG";
import nextIcon from "../public/next.svg";
import reactIcon from "../public/react-js-icon.svg";
import angularIcon from "../public/angular-icon.svg";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <div className="max-screen-2xl min-h-screen">
          <div className="grid grid-flow-row sm:grid-cols-2 sm:grid-flow-col  md:grid-rows-1 gap-8">
            <div className="flex flex-col	justify-center">
              <h1
                className="text-3xl lg:text-4xl xl:text-5xl text-black-600 leading-normal px-8
                font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-purple-500 to-blue-500"
              >
                My name is Zakaria Arr, welcome to my personal blog and website
                <span className="text-zinc-900 ">.</span>
              </h1>
              <p className="text-2xl text-zinc-900 font-normal leading-7 antialiased px-8 mt-4 mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium ea aliquam quasi voluptas, esse sit asperiores! Ea
                eius ab laboriosam tempore architecto debitis blanditiis eum
                autem, unde natus reiciendis reprehenderit.
              </p>
            </div>
            <div>
              <Image
                src={portfolioPic}
                height={500}
                width={500}
                className="min-h-full"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-800 to-blue-300 py-24">
        <div className="container mx-auto">
          <h1 className="text-white text-4xl font-bold subpixel-antialiased	px-8">
            My Tech Stack is:
          </h1>
          <div className="flex flex-row justify-around flex-wrap my-12">
            <Image
              className="w-24"
              src={reactIcon}
              height={150}
              width={150}
              alt=""
            />
            <Image
              className="w-24"
              src={angularIcon}
              height={150}
              width={150}
              alt=""
            />
            <Image
              className="w-24"
              src={nextIcon}
              height={150}
              width={150}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
