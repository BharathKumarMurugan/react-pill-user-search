import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea"
import FontStyle from "@/components/FontStyle";


export default function Home() {
  return (
    <main className="mx-8 my-4">
      <div className="min-h-screen md:flex">
        <div className="md:h-screen md:overflow-y-auto md:no-scrollbar">
          <div className="container my-[34px]">
            {/* <header>
            <h2 className="max-h-[50px] max-w-[170px] object-contain">Text Editor</h2>
          </header> */}
            <section className="mt-6">
              <h2 className="text-[32px] font-semibold">Text Editor</h2>
              <div className="mt-[32px]">
                <div className="w-full bg-white rounded-2xl mobile:p-4 border border-[#DDDDDD] p-5">
                  <div className="flex gap-1 flex-wrap mt-4">
                    <FontStyle />
                  </div>
                </div>
                <div className="w-full bg-white rounded-2xl mobile:p-4 mt-4 border border-[#DDDDDD] p-5">
                <Textarea style={{width: '820px'}} placeholder="Type your message here." />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
