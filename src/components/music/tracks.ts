export type MusicTrack = {
  id: string;
  index: string;
  titleEn: string;
  titleZh: string;
  date: string;
  ganZhiDate: string;
  duration: string;
  cover: string;
  audio: string;
  lyrics: readonly (readonly string[])[];
};

export const tracks: readonly MusicTrack[] = [
  {
    id: "the-long-march",
    index: "01",
    titleEn: "The Long March",
    titleZh: "长征",
    date: "2026.03.06",
    ganZhiDate: "丙午年 辛卯月 己卯日",
    duration: "03:33",
    cover: "/music/the_long_march/the_long_march_cover.png",
    audio: "/music/the_long_march/长征.mp3",
    lyrics: [
      ["当年忠贞为国酬，", "视死如归志不休。", "而今天下尽红遍，", "此后江山谁人守？", "谁人守？"],
      ["功业未成身躯朽，", "风霜无情染白头。", "初心未改今犹在，", "怎忍夙愿付东流？", "付东流？"],
    ],
  },
  {
    id: "wrangler",
    index: "02",
    titleEn: "Wrangler",
    titleZh: "牧",
    date: "2026.10.03",
    ganZhiDate: "丙午年 丁酉月 庚戌日",
    duration: "01:46",
    cover: "/music/wrangler/wrangler_cover.png",
    audio: "/music/wrangler/牡.mp3",
    lyrics: [
      ["玄鸟西垂，渭水汤汤。", "肇基于野，厥土蛮荒。", "鼎簋既覆，烽燧荡荡。", "寸草弥坚，岁岁其昌。"],
      ["一木徙立，众庶攸望。", "且耕且战，黍稷壤壤。", "西拓三川，南涉汉江。", "其志渐广，其弓欲张。"],
      ["六世余烈，夙心不忘。", "载涉寒露，不惧严霜。", "大河东流，浩浩汤汤。", "既定六合，四海一方。"],
      ["六世余烈，夙心不忘。", "道阻且长，行路未央。", "川流不息，萬古苍苍。", "千秋月明，入我新窗。"],
    ],
  },
];
