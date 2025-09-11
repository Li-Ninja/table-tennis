import React from 'react';

export default function Rule() {
  return (
    <main className="bg-black text-white min-h-screen py-6">
      <div className="container mx-auto px-2 lg:px-8">
        {/* Header */}
        <header className="text-center mb-8">
          <p className="text-md text-gray-300">
            關於比賽規則和積分的詳細介紹。
          </p>
        </header>

        {/* Outline */}
        <nav className="mb-12 p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-600">
            目錄
          </h2>
          <ul className="space-y-2">
            <li>
              <a href="#champion" className="text-gray-300 hover:text-white hover:underline">冠軍賽</a>
            </li>
            <li>
              <a href="#final" className="text-gray-300 hover:text-white hover:underline">年終賽</a>
            </li>
            <li>
              <a href="#gold-ping" className="text-gray-300 hover:text-white hover:underline">金乒獎</a>
            </li>
            <li>
              <a href="#gold-pong" className="text-gray-300 hover:text-white hover:underline">金乓獎</a>
            </li>
          </ul>
        </nav>

        {/* 冠軍賽 */}
        <section className="mb-12">
          <h2 id="champion" className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-600">
            冠軍賽
          </h2>
          <div className="space-y-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                基本資訊
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                <li>名稱由來是效仿 WTT 在每一個國家城市所舉辦的比賽。</li>
                <li>獲邀加入團隊者可參與冠軍賽。</li>
                <li>採取積分制度。</li>
                <li>賽制分成單打、雙打兩種。</li>
                <li>場次為五戰三勝制。</li>
                <li>
                  每月可以與不同選手組合挑戰
                  <span className="text-red-500 font-bold">一次</span>，超過次數不列入該場次積分。
                </li>
                <li>
                  不得有消極比賽、蓄意放水或違規行為造成積分結果失準，經確認則不列入該場次積分。
                </li>
              </ul>
            </div>

            <div className="ml-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                單打、雙打
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <p className="text-md text-gray-300 leading-relaxed">
                    為確保積分能夠真實且準確地反映選手的實際實力與競技水平，本賽事
                    <span className="text-red-500 font-bold">不設讓分機制</span>
                    。唯特殊選手經團長裁定，得設立個別調整機制，以平衡比賽的公平性與競爭性。
                  </p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <h4 className="text-md font-bold flex items-center gap-2 mb-2">
                    👤 單打
                  </h4>
                  <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed">
                    <li>初始積分由團長評估。</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <h4 className="text-md font-bold flex items-center gap-2 mb-2">
                    👥 雙打
                  </h4>
                  <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                    <li>欲申請雙打的兩位選手，若當下皆未有雙打組合時，任何時候都可以提出組合申請。</li>
                    <li>每季結束時皆可申請雙打拆伙，時間為 3/31、6/30、9/30、12/31。</li>
                    <li>
                      若雙方皆有雙打積分，初始積分由最後組合的雙打積分相加除以二來計算。
                      <ul className="list-circle pl-6 text-sm text-gray-400 leading-relaxed mt-2 space-y-1">
                        <li>A 與其他人的雙打積分 800 分，B 與其他人的雙打積分 900 分，則初始積分為 850 分。</li>
                        <li>
                          A 與其他人的雙打積分 900 分，B 與 C、D 皆組合過雙打，分別是 920、950，最後組合是 D，則 A、B
                          組合的初始積分為 925 分。
                        </li>
                      </ul>
                    </li>
                    <li>
                      若雙方有一人無雙打積分，則初始積分由兩位選手當下的單打積分相加除以二來計算。
                      <ul className="list-circle pl-6 text-sm text-gray-400 leading-relaxed mt-2 space-y-1">
                        <li>A 單打積分 900 分，B 單打積分 1,000 分，則初始積分為 950 分。</li>
                        <li>A 單打積分 950 分，B 單打積分 900 分，則初始積分為 925 分。</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="ml-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                積分計算
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <h4 className="text-md font-bold flex items-center gap-2 mb-2">
                    📋 積分概述
                  </h4>
                  <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                    <li>
                      積分賽根據選手之間的積分差距，設定不同的計分規則，以確保比賽的公平性並激勵低分選手挑戰高分選手。
                    </li>
                    <li>每場比賽後，根據勝負和分數差距調整雙方的積分。</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <h4 className="text-md font-bold flex items-center gap-2 mb-2">
                    📊 積分規則表
                  </h4>
                  <p className="text-md text-gray-300 mb-4">
                    以下為不同積分差距範圍對應的加分邏輯：
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="space-y-2">
                      <p className="font-bold text-white">積分差距範圍</p>
                      <div className="space-y-1 text-gray-300">
                        <p>0 ~ 30</p>
                        <p>31 ~ 61</p>
                        <p>62 ~ 92</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>93 ~ 123</p>
                        <p>124 ~ 154</p>
                        <p>155 ~ 185</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>186 ~ 216</p>
                        <p>217 ~ 247</p>
                        <p>247 以上</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-white">高分選手獲勝加分</p>
                      <div className="space-y-1 text-gray-300">
                        <p>+9</p>
                        <p>+8</p>
                        <p>+7</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>+6</p>
                        <p>+5</p>
                        <p>+4</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>+3</p>
                        <p>+2</p>
                        <p>+1</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-white">低分選手獲勝加分</p>
                      <div className="space-y-1 text-gray-300">
                        <p>+9</p>
                        <p>+11</p>
                        <p>+15</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>+21</p>
                        <p>+29</p>
                        <p>+39</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>+51</p>
                        <p>+65</p>
                        <p>+81</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <h4 className="text-md font-bold flex items-center gap-2 mb-2">
                    🎯 低分者表現獎勵機制
                  </h4>
                  <p className="text-md text-gray-300 mb-4">
                    原本的扣分計算完成後，若低分者戰敗但表現良好，可獲得額外積分獎勵：
                  </p>
                  {/* 桌面版表格 */}
                  <div className="hidden md:grid grid-cols-6 gap-4 text-center text-sm">
                    <div className="space-y-2">
                      <p className="font-bold text-white">積分差距範圍</p>
                      <div className="space-y-1 text-gray-300">
                        <p>124 ~ 154</p>
                        <p>155 ~ 185</p>
                        <p>186 ~ 216</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>217 ~ 247</p>
                        <p>248 以上</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-white">6 分</p>
                      <div className="space-y-1 text-gray-300">
                        <p>-</p>
                        <p>-</p>
                        <p>-</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>+11</p>
                        <p>+13</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-white">7 分</p>
                      <div className="space-y-1 text-gray-300">
                        <p>+6</p>
                        <p>+8</p>
                        <p>+10</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>+12</p>
                        <p>+14</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-white">8 分</p>
                      <div className="space-y-1 text-gray-300">
                        <p>+7</p>
                        <p>+9</p>
                        <p>+11</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>+13</p>
                        <p>+15</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-white">9 分</p>
                      <div className="space-y-1 text-gray-300">
                        <p>+8</p>
                        <p>+10</p>
                        <p>+12</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>+14</p>
                        <p>+16</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-white">10 分</p>
                      <div className="space-y-1 text-gray-300">
                        <p>+10</p>
                        <p>+12</p>
                        <p>+14</p>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="space-y-1 text-gray-300">
                        <p>+20</p>
                        <p>+22</p>
                      </div>
                    </div>
                  </div>

                  {/* 手機版表格 */}
                  <div className="md:hidden space-y-4">
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      <div className="space-y-2">
                        <p className="font-bold text-white">積分差距 124-154</p>
                        <div className="space-y-1 text-gray-300">
                          <p>平均每局得 7 分 → +6</p>
                          <p>平均每局得 8 分 → +7</p>
                          <p>平均每局得 9 分 → +8</p>
                          <p>平均每局得 10 分 → +10</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-white">積分差距 155-185</p>
                        <div className="space-y-1 text-gray-300">
                          <p>平均每局得 7 分 → +8</p>
                          <p>平均每局得 8 分 → +9</p>
                          <p>平均每局得 9 分 → +10</p>
                          <p>平均每局得 10 分 → +12</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-white">積分差距 186-216</p>
                        <div className="space-y-1 text-gray-300">
                          <p>平均每局得 7 分 → +10</p>
                          <p>平均每局得 8 分 → +11</p>
                          <p>平均每局得 9 分 → +12</p>
                          <p>平均每局得 10 分 → +14</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-white">積分差距 217-247</p>
                        <div className="space-y-1 text-gray-300">
                          <p>平均每局得 6 分 → +11</p>
                          <p>平均每局得 7 分 → +12</p>
                          <p>平均每局得 8 分 → +13</p>
                          <p>平均每局得 9 分 → +14</p>
                          <p>平均每局得 10 分 → +20</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-white">積分差距 248 以上</p>
                        <div className="space-y-1 text-gray-300">
                          <p>平均每局得 6 分 → +13</p>
                          <p>平均每局得 7 分 → +14</p>
                          <p>平均每局得 8 分 → +15</p>
                          <p>平均每局得 9 分 → +16</p>
                          <p>平均每局得 10 分 → +22</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">
                    <strong>計算方式：</strong>積分低者戰敗後，全部局數的分數加起來除以總共打的局數
                  </p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <h4 className="text-md font-bold flex items-center gap-2 mb-2">
                    🧮 積分計算範例
                  </h4>
                  <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-4">
                    <li>
                      <p className="font-bold">積分差距：50（高分選手：1000，低分選手：950）</p>
                      <ul className="list-circle pl-6 mt-2 space-y-1">
                        <li>規則範圍：31 ~ 61。</li>
                        <li>高分選手獲勝 +8，低分選手 -8。</li>
                        <li>低分選手獲勝 +11，高分選手 -11。</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-bold">積分差距：200（高分選手：1200，低分選手：1000）</p>
                      <ul className="list-circle pl-6 mt-2 space-y-1">
                        <li>規則範圍：186 ~ 216。</li>
                        <li>高分選手獲勝 +3，低分選手 -3。</li>
                        <li>低分選手獲勝 +51，高分選手 -51。</li>
                        <li>若低分者戰敗但平均每局得 9 分，額外獲得 +12 積分。</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <h4 className="text-md font-bold flex items-center gap-2 mb-2">
                    🎯 結算
                  </h4>
                  <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                    <li>積分計算區間為每年 12 月到次年 11 月。</li>
                    <li>積分不重置，但系統可以看到不同的年度積分。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 年終賽 */}
        <section className="mb-12">
          <h2 id="final" className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-600">
            年終賽
          </h2>
          <div className="space-y-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                📋 參賽資格
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                <li>報名資訊由賽事組另行公告。</li>
                <li><strong>銅乒是</strong>參與年終賽的最低門檻，需達成基礎的對戰次數要求（詳見金乒獎）。</li>
                <li>雙打的參賽門檻次數為銅乒的 0.6 倍。</li>
                <li>雙打場次已年度來各別計算是否符合資格，雙打組合兩人都需達到門檻。</li>
                <li>請假中或是有其餘特殊狀況，由賽事組決議是否得以參賽。</li>
                <li>賽制分組依照最後三個月的平均積分來分組。</li>
                <li>若該選手的單打積分嚴重不屬於該組別，賽事組有權利調整該選手的單打積分。</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                🏆 獎項
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                <li>單打與雙打冠軍常設獎盃或等同價值紀念品。</li>
                <li>其餘名次由賽事組另行決議。</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                👤 單打賽制
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                <li>依照積分區間分成 ABC 三個組別進行。</li>
                <li>組別積分限制由賽事組開放報名時另行提供。</li>
                <li>
                  分組範例：
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>A 組限 900 分以上報名</li>
                    <li>B 組限 920 分以下報名</li>
                    <li>C 組限 850 分以下報名</li>
                  </ul>
                </li>
                <li>依照該組別的報名人數，由賽事組採取小組賽、循環賽、單淘汰、雙敗淘汰等賽制。</li>
                <li>若該組報名人數小於等於 4 人，則不舉辦。</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                👥 雙打賽制
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                <li>依照積分區間分成 AB 兩個組別進行。</li>
                <li>組別積分限制由賽事組開放報名時另行提供。</li>
                <li>依照該組別的報名人數，由賽事組採取小組賽、循環賽、單淘汰、雙敗淘汰等賽制。</li>
                <li>若該組報名組數小於 4 組，則不舉辦。</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                👪 團體賽制
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed">
                <li>由賽事組決議是否舉辦。</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                🎊 其他團康
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed">
                <li>由賽事組決議是否舉辦。</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 金乒獎 */}
        <section className="mb-12">
          <h2 id="gold-ping" className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-600">
            金乒獎
          </h2>
          <div className="space-y-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                🎯 獎項目的
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                <li>乒獎根據年度比賽頻率與活躍程度設立，是參與年終賽的基本門檻，鼓勵全年穩定參賽。</li>
                <li>乒獎分為<strong>金乒</strong>、<strong>銀乒與銅乒</strong>，以年度累積對戰次數進行評定。</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                💫 獎項意義
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                <li>鼓勵參賽者全年穩定對戰，培養持續參與比賽的習慣。</li>
                <li>提升對戰頻率，促進技術進步和交流。</li>
                <li>為年終賽提供公平的基礎門檻，確保賽事品質。</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                🏅 乒獎條件
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-md font-semibold text-white mb-2">🥇 金乒</h4>
                  <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed">
                    <li>年度累積對戰數 <strong>150 場以上</strong>。</li>
                    <li>獲頒金乒獎殊榮。</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white mb-2">🥈 銀乒</h4>
                  <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed">
                    <li>年度累積對戰數 <strong>100 場至 149 場</strong>。</li>
                    <li>獲頒銀乒獎殊榮。</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white mb-2">🥉 銅乒</h4>
                  <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed">
                    <li>年度累積對戰數 <strong>40 場至 99 場</strong>。</li>
                    <li>獲得年終賽參賽資格。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 金乓獎 */}
        <section className="mb-12">
          <h2 id="gold-pong" className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-600">
            金乓獎
          </h2>
          <div className="space-y-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                🎯 獎項目的
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                <li>乓獎根據年度<strong>積分表現與勝率</strong>設立，旨在表彰技術優秀的參賽者，突顯競賽的競爭性與成果。</li>
                <li>乓獎為金乓獎，根據參賽者積分或勝率的達標情況授予。</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                💫 獎項意義
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                <li>鼓勵參賽者追求技術提升，提升比賽競爭力。</li>
                <li>提供明確的積分與勝率目標，讓參賽者有進步方向。</li>
                <li>增強比賽成就感，激勵參賽者挑戰自我。</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                🥇 金乓條件
              </h3>
              <ul className="list-disc pl-6 text-md text-gray-300 leading-relaxed space-y-2">
                <li>
                  條件擇一：
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>年度積分達 950 以上。</li>
                    <li>年度勝率達 70% 以上。</li>
                    <li>年度勝率比去年度進步 30% 以上。</li>
                    <li>年度積分比去年度進步 150 分以上。</li>
                  </ul>
                </li>
                <li>獲頒金乓獎殊榮。</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
