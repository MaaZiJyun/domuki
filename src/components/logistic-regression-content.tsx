import LogisticRegressionVisualizer from "@/components/logistic-regression-visualizer";
import InformationTheoryVisualizer from "@/components/information-theory-visualizer";
import MathFormula from "@/components/math-formula";

function NoteHeading({ children }: { children: React.ReactNode }) {
  return <h5 className="m-0 text-xl font-semibold tracking-[-0.02em]">{children}</h5>;
}

function Definition({ children }: { children: React.ReactNode }) {
  return (
    <p className="m-0 leading-8">
      <strong className="mr-2 font-semibold">定义：</strong>
      {children}
    </p>
  );
}

export default function LogisticRegressionContent() {
  return (
    <>
      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>逻辑斯蒂回归</NoteHeading>
        <p className="m-0">
          一种用于二分类（Binary Classification）的监督学习模型，通过 Sigmoid 函数将线性模型的输出映射为类别概率。
        </p>
        <p className="m-0">
          <strong className="mr-2 font-semibold">关键词：</strong>
          二分类、线性分类器、概率预测、Sigmoid 激活函数。
        </p>
        <MathFormula display>{String.raw`f(x;w,b)=\sigma(x^T w+b)`}</MathFormula>
        <div>
          <p className="mb-3 font-semibold">其中：</p>
          <ul className="m-0 space-y-2 pl-5 marker:text-current/45">
            <li><MathFormula>{String.raw`x\in\mathbb{R}^d`}</MathFormula>：输入特征向量。</li>
            <li><MathFormula>{String.raw`w\in\mathbb{R}^d`}</MathFormula>：权重。</li>
            <li><MathFormula>{String.raw`b\in\mathbb{R}`}</MathFormula>：偏置。</li>
            <li><MathFormula>{String.raw`\sigma`}</MathFormula>：Sigmoid 激活函数。</li>
            <li><MathFormula>{String.raw`f(x;w,b)`}</MathFormula>：预测属于正类（<MathFormula>{String.raw`y=1`}</MathFormula>）的概率。</li>
          </ul>
        </div>
      </section>

      <section className="space-y-5 border-t border-current/10 pt-8">
        <NoteHeading>从输入到概率</NoteHeading>
        <LogisticRegressionVisualizer />
      </section>

      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>Sigmoid 函数</NoteHeading>
        <Definition>将任意实数映射至 <MathFormula>{String.raw`(0,1)`}</MathFormula> 区间的非线性函数，使模型输出可解释为概率。</Definition>
        <MathFormula display>{String.raw`\sigma(z)=\frac{1}{1+e^{-z}}`}</MathFormula>
        <p className="m-0">Sigmoid 函数呈 S 形曲线，输出范围为 <MathFormula>{String.raw`(0,1)`}</MathFormula>。</p>
        <div>
          <p className="mb-3 font-semibold">关键性质：</p>
          <ul className="m-0 space-y-2 pl-5 marker:text-current/45">
            <li><MathFormula>{String.raw`z\to+\infty`}</MathFormula>，则 <MathFormula>{String.raw`\sigma(z)\to1`}</MathFormula>。</li>
            <li><MathFormula>{String.raw`z\to-\infty`}</MathFormula>，则 <MathFormula>{String.raw`\sigma(z)\to0`}</MathFormula>。</li>
            <li><MathFormula>{String.raw`z=0`}</MathFormula>，则 <MathFormula>{String.raw`\sigma(z)=0.5`}</MathFormula>。</li>
            <li>通常以 <MathFormula>{String.raw`0.5`}</MathFormula> 为阈值进行二分类。</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>交叉熵</NoteHeading>
        <Definition>衡量真实概率分布与预测概率分布之间差异的指标，常用作分类模型的损失函数。</Definition>
        <p className="mb-0 font-semibold">对于两个离散概率分布 <MathFormula>{String.raw`p,q`}</MathFormula>：</p>
        <MathFormula display>{String.raw`H(p,q)=-\sum_{j=1}^{m}p_j\ln q_j`}</MathFormula>
        <ul className="m-0 space-y-2 pl-5 marker:text-current/45">
          <li><MathFormula>p</MathFormula>：真实概率分布。</li>
          <li><MathFormula>q</MathFormula>：预测概率分布。</li>
          <li><MathFormula>m</MathFormula>：类别数量。</li>
        </ul>
        <p className="m-0"><strong className="mr-2 font-semibold">核心思想：</strong>预测分布越接近真实分布，交叉熵越小（真实分布固定时）。</p>
      </section>

      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>信息熵</NoteHeading>
        <Definition>衡量概率分布不确定性的指标。</Definition>
        <MathFormula display>{String.raw`H(p)=-\sum_{j=1}^{m}p_j\ln p_j`}</MathFormula>
        <p className="m-0"><strong className="mr-2 font-semibold">关键词：</strong>信息量、不确定性、概率分布。</p>
      </section>

      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>KL 散度</NoteHeading>
        <Definition>衡量两个概率分布之间差异的非对称指标。</Definition>
        <MathFormula display>{String.raw`\mathrm{KL}(p\parallel q)=\sum_{j=1}^{m}p_j\ln\frac{p_j}{q_j}`}</MathFormula>
        <div>
          <p className="mb-3 font-semibold">关键性质：</p>
          <ul className="m-0 space-y-2 pl-5 marker:text-current/45">
            <li><MathFormula>{String.raw`\mathrm{KL}(p\parallel q)\geq0`}</MathFormula>。</li>
            <li>当且仅当 <MathFormula>{String.raw`p=q`}</MathFormula> 时，KL 散度为零（对离散分布）。</li>
            <li>不具有对称性，一般 <MathFormula>{String.raw`\mathrm{KL}(p\parallel q)\neq\mathrm{KL}(q\parallel p)`}</MathFormula>。</li>
          </ul>
        </div>
        <p className="mb-0 font-semibold">与交叉熵的关系：</p>
        <MathFormula display>{String.raw`\boxed{\mathrm{KL}(p\parallel q)=H(p,q)-H(p)}`}</MathFormula>
        <p className="m-0">由于真实分布 <MathFormula>p</MathFormula> 固定，<MathFormula>{String.raw`H(p)`}</MathFormula> 为常数，因此最小化交叉熵等价于最小化 KL 散度。</p>
        <InformationTheoryVisualizer />
      </section>

      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>二元交叉熵损失</NoteHeading>
        <Definition>通过二元交叉熵衡量预测概率与真实二分类标签之间的差异。</Definition>
        <p className="mb-0 font-semibold">单样本二元交叉熵（Binary Cross-Entropy）：</p>
        <MathFormula display>{String.raw`\ell_i=-\left[y_i\ln\hat{p}_i+(1-y_i)\ln(1-\hat{p}_i)\right]`}</MathFormula>
        <p className="mb-0">其中：</p>
        <MathFormula display>{String.raw`\hat{p}_i=\sigma(x_i^T w+b)`}</MathFormula>
        <p className="mb-0 font-semibold">训练集平均损失：</p>
        <MathFormula display>{String.raw`L(w,b)=\frac{1}{n}\sum_{i=1}^{n}\ell_i`}</MathFormula>
        <p className="m-0"><strong className="mr-2 font-semibold">关键词：</strong>二元交叉熵、概率误差、损失最小化。</p>
      </section>

      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>正则化与参数优化</NoteHeading>
        <Definition>在损失函数中加入参数惩罚项，以缓解过拟合并改善泛化能力。</Definition>
        <MathFormula display>{String.raw`\min_{w,b}L(w,b)+\lambda R(w)`}</MathFormula>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-y border-current/20 text-[11px] uppercase tracking-[0.12em]">
                <th className="px-3 py-3 font-semibold">方法</th>
                <th className="px-3 py-3 font-semibold">正则项</th>
                <th className="px-3 py-3 font-semibold">作用</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-current/10">
              <tr>
                <td className="px-3 py-3 font-semibold">L1</td>
                <td className="px-3 py-3"><MathFormula>{String.raw`\lVert w\rVert_1`}</MathFormula></td>
                <td className="px-3 py-3">促进稀疏性</td>
              </tr>
              <tr>
                <td className="px-3 py-3 font-semibold">L2</td>
                <td className="px-3 py-3"><MathFormula>{String.raw`\lVert w\rVert_2^2`}</MathFormula></td>
                <td className="px-3 py-3">抑制权重过大</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Definition>通过数值优化算法寻找使目标函数最小的模型参数。</Definition>
        <MathFormula display>{String.raw`(\hat{w},\hat{b})=\arg\min_{w,b}\left[L(w,b)+\lambda R(w)\right]`}</MathFormula>
        <p className="m-0"><strong className="mr-2 font-semibold">常见算法：</strong>梯度下降（Gradient Descent）、随机梯度下降（SGD）、Newton–Raphson、L-BFGS。</p>
      </section>

      <section className="space-y-5 border-t border-current/10 pt-8">
        <NoteHeading>逻辑斯蒂回归流程</NoteHeading>
        <ol className="m-0 grid gap-3 p-0 sm:grid-cols-2">
          {[
            ["01", "逻辑斯蒂回归", "二分类概率模型"],
            ["02", "线性变换 + Sigmoid", <MathFormula key="probability">{String.raw`\hat{p}=\sigma(x^T w+b)`}</MathFormula>],
            ["03", "二元交叉熵损失", "衡量预测概率与真实标签的差异"],
            ["04", "正则化 + 参数优化", <>最小化目标函数，学习 <MathFormula>w</MathFormula>、<MathFormula>b</MathFormula></>],
            ["05", "分类预测", "概率阈值 → 类别 0 或 1"],
          ].map(([number, title, detail]) => (
            <li key={String(number)} className="list-none border border-current/15 p-4">
              <span className="text-[9px] tracking-[0.16em] opacity-55">{number}</span>
              <p className="my-1 font-semibold">{title}</p>
              <div className="text-sm opacity-75">{detail}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-5 border-t border-current/10 pt-8">
        <NoteHeading>线性回归与逻辑斯蒂回归</NoteHeading>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-y border-current/20 text-[11px] uppercase tracking-[0.12em]">
                <th className="px-3 py-3 font-semibold">对比维度</th>
                <th className="px-3 py-3 font-semibold">线性回归</th>
                <th className="px-3 py-3 font-semibold">逻辑斯蒂回归</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-current/10">
              <tr><td className="px-3 py-3 font-semibold">任务</td><td className="px-3 py-3">连续数值预测</td><td className="px-3 py-3">二分类</td></tr>
              <tr><td className="px-3 py-3 font-semibold">输出</td><td className="px-3 py-3">实数</td><td className="px-3 py-3">0–1 之间的概率</td></tr>
              <tr><td className="px-3 py-3 font-semibold">模型</td><td className="px-3 py-3"><MathFormula>{String.raw`x^T w+b`}</MathFormula></td><td className="px-3 py-3"><MathFormula>{String.raw`\sigma(x^T w+b)`}</MathFormula></td></tr>
              <tr><td className="px-3 py-3 font-semibold">常用损失</td><td className="px-3 py-3">均方误差</td><td className="px-3 py-3">二元交叉熵</td></tr>
              <tr><td className="px-3 py-3 font-semibold">常用优化</td><td className="px-3 py-3">最小二乘法、梯度下降</td><td className="px-3 py-3">梯度下降、Newton、L-BFGS</td></tr>
            </tbody>
          </table>
        </div>
        <p className="m-0 border-l-2 border-[#b81522] py-1 pl-4 leading-8">
          <strong className="mr-2 font-semibold">最重要的联系：</strong>
          两者都以线性函数 <MathFormula>{String.raw`x^T w+b`}</MathFormula> 为基础。线性回归直接输出数值，而逻辑斯蒂回归通过 Sigmoid 将线性输出转化为概率。
        </p>
      </section>
    </>
  );
}
