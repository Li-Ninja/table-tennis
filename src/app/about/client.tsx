import Image from 'next/image';

export default function About() {
  return (
    <main className="bg-black text-white min-h-screen py-6">
      <div className="container mx-auto px-2 lg:px-8">
        {/* Header */}
        <header className="text-center mb-8">
          <p className="text-md text-gray-300">
            Ttt51 致力於推廣桌球文化，打造公平競爭與持續進步的環境。
          </p>
        </header>

        {/* Image Section */}
        <section className="text-center mb-12">
          <Image
            src="/ttt51/home.png"
            alt="Ttt51 Logo"
            width={192}
            height={192}
            className="mx-auto rounded-lg shadow-lg"
          />
        </section>

        {/* Team Purpose */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">
            團隊宗旨
          </h2>
          <p className="text-md text-gray-300 leading-relaxed">
            Ttt51 (Taiwan Table Tennis 51) 的成立，旨在推廣桌球運動，營造公平競爭與技術提升的環境，
            透過冠軍賽和年終賽制度，讓選手們在團隊中相互切磋，成長與共榮。
          </p>
        </section>

        {/* Team Values */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">
            團隊價值觀
          </h2>
          <div className="space-y-6">
            {[
              {
                icon: '🏅',
                title: '公平競爭',
                description:
                  '強調挑戰與比賽機會均等，設立透明規則，確保賽事公正，讓每位選手都能在公平的環境中展現實力。',
              },
              {
                icon: '📈',
                title: '持續進步',
                description:
                  '鼓勵選手穩定參賽，追求技術突破，並以清晰目標驅動成長，成為更好的自己。',
              },
              {
                icon: '🤝',
                title: '團結合作',
                description:
                  '除了關注個人成績，也重視隊員之間的合作與互助，共同創造包容且充滿凝聚力的運動氛圍。',
              },
              {
                icon: '🌟',
                title: '熱情推廣',
                description:
                  '致力於推廣桌球文化，吸引更多熱愛桌球的人參與，讓桌球成為更多人生活中不可或缺的一部分。',
              },
              {
                icon: '❤️',
                title: '人品至上',
                description:
                  '強調人品比球技更重要。團隊成員需展現誠實、尊重和體諒，無論在場內或場外，都應以良好的態度對待隊友、對手與觀眾，體現運動精神的核心價值。',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700"
              >
                <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                  {value.icon} {value.title}
                </h3>
                <p className="text-md text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Rules */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            團隊守則
          </h2>
          <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              🏆 邀請制度
            </h3>
            <p className="text-md text-gray-300 leading-relaxed">
              由團長邀請符合團隊價值觀的人加入，確保團隊理念一致，維持團隊和諧與正向發展。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
