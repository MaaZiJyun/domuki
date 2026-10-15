import MathFormula from "@/components/math-formula";
import LinearRegressionVisualizer from "@/components/linear-regression-visualizer";
import LogisticRegressionContent from "@/components/logistic-regression-content";
import ProcessFlow from "@/components/process-flow";

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

export default function LinearModelsContent() {
  return (
    <div lang="zh-CN" className="mt-7 space-y-10 text-[15px] leading-8">
      <section className="space-y-4">
        <NoteHeading>线性模型</NoteHeading>
        <Definition>线性模型是一类最简单的监督机器学习模型，可被视为单层神经网络。</Definition>
        <p className="m-0">
          <strong className="mr-2 font-semibold">主要类型：</strong>
          线性回归（Linear Regression）、逻辑斯蒂回归（Logistic Regression）、Softmax 分类器。
        </p>
      </section>

      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>线性回归</NoteHeading>
        <p className="m-0">
          线性回归是一种监督学习方法，通过建立输入特征与连续目标变量之间（x与y）的线性关系，实现数值预测。
        </p>
        <MathFormula display>{String.raw`f(x;w,b)=x^T w+b`}</MathFormula>
        <LinearRegressionVisualizer />
        <div>
          <p className="mb-3 font-semibold">关键词：</p>
          <ul className="m-0 space-y-2 pl-5 marker:text-current/45">
            <li><MathFormula>{String.raw`x\in\mathbb{R}^d`}</MathFormula>：特征向量（Feature Vector），包含 <MathFormula>d</MathFormula> 个特征。</li>
            <li><MathFormula>{String.raw`w\in\mathbb{R}^d`}</MathFormula>：权重（Weights），决定各特征对预测结果的影响。</li>
            <li><MathFormula>{String.raw`b\in\mathbb{R}`}</MathFormula>：偏置（Bias / Intercept），控制预测值的整体偏移。</li>
            <li><MathFormula>{String.raw`f(x;w,b)`}</MathFormula>：预测函数。</li>
          </ul>
        </div>
        <p className="mb-0 font-semibold">展开形式：</p>
        <MathFormula display>{String.raw`f(x;w,b)=\sum_{j=1}^{d}w_jx_j+b`}</MathFormula>
      </section>

      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>训练数据</NoteHeading>
        <Definition>利用带标签的历史数据，通过最小化损失函数估计模型参数 <MathFormula>{String.raw`w,b`}</MathFormula>。</Definition>
        <MathFormula display>{String.raw`\mathcal{D}=\{(x_i,y_i)\}_{i=1}^{n}`}</MathFormula>
        <p className="m-0">
          其中 <MathFormula>{String.raw`x_i`}</MathFormula> 为输入特征，<MathFormula>{String.raw`y_i`}</MathFormula> 为真实标签，
          <MathFormula>{String.raw`n`}</MathFormula> 为样本数量。
        </p>
      </section>

      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>损失函数</NoteHeading>
        <Definition>衡量模型预测值与真实值之间的差异，是模型优化的目标。</Definition>
        <p className="mb-0 font-semibold">最小二乘损失（Least Squares Loss）：</p>
        <MathFormula display>{String.raw`L(w,b)=\frac{1}{2n}\sum_{i=1}^{n}\left(f(x_i;w,b)-y_i\right)^2`}</MathFormula>
        <p className="m-0">
          <strong className="mr-2 font-semibold">关键词：</strong>
          平方误差、预测偏差、损失最小化。
        </p>
      </section>

      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>参数优化与预测</NoteHeading>
        <Definition>通过数学求解或数值优化，寻找使损失函数最小的模型参数。</Definition>
        <MathFormula display>{String.raw`(\hat{w},\hat{b})=\arg\min_{w,b}L(w,b)`}</MathFormula>
        <p className="m-0">
          <strong className="mr-2 font-semibold">常见方法：</strong>
          解析解（如最小二乘解）、梯度下降（Gradient Descent）、共轭梯度（Conjugate Gradient）。
        </p>
        <Definition>将新样本输入训练完成的模型，利用估计参数计算预测值。</Definition>
        <MathFormula display>{String.raw`\hat{y}=x^T\hat{w}+\hat{b}`}</MathFormula>
      </section>

      <section className="space-y-4 border-t border-current/10 pt-8">
        <NoteHeading>正则化</NoteHeading>
        <Definition>在损失函数中增加对模型参数的惩罚项，限制模型复杂度，以缓解过拟合（Overfitting）。</Definition>
        <p className="mb-0 font-semibold">正则化目标：</p>
        <MathFormula display>{String.raw`\min_{w,b}\;L(w,b)+\lambda R(w)`}</MathFormula>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-y border-current/20 text-[11px] uppercase tracking-[0.12em]">
                <th className="px-3 py-3 font-semibold">方法</th>
                <th className="px-3 py-3 font-semibold">正则项</th>
                <th className="px-3 py-3 font-semibold">主要特点</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-current/10">
              <tr>
                <td className="px-3 py-3 font-semibold">L1 / LASSO</td>
                <td className="px-3 py-3"><MathFormula>{String.raw`\lVert w\rVert_1`}</MathFormula></td>
                <td className="px-3 py-3">促进权重稀疏，可用于特征选择</td>
              </tr>
              <tr>
                <td className="px-3 py-3 font-semibold">L2 / Ridge</td>
                <td className="px-3 py-3"><MathFormula>{String.raw`\lVert w\rVert_2^2`}</MathFormula></td>
                <td className="px-3 py-3">抑制权重过大，改善模型稳定性</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="m-0">
          <MathFormula>{String.raw`\lambda`}</MathFormula>：正则化强度，控制数据拟合与参数约束之间的平衡。
        </p>
        <Definition>
          通过不同的数据划分评估模型的泛化表现，用于模型选择与超参数调优，例如选择正则化系数 <MathFormula>{String.raw`\lambda`}</MathFormula>。
        </Definition>
      </section>

      <section className="space-y-5 border-t border-current/10 pt-8">
        <NoteHeading>线性回归流程</NoteHeading>
        <ProcessFlow
          steps={[
            { number: "01", title: "数据准备", detail: <>特征 <MathFormula>x</MathFormula> + 标签 <MathFormula>y</MathFormula></> },
            { number: "02", title: "建立线性模型", detail: <MathFormula>{String.raw`f(x)=x^T w+b`}</MathFormula> },
            { number: "03", title: "定义优化目标", detail: "最小二乘损失 + 可选正则化" },
            { number: "04", title: "训练模型", detail: <>优化参数 <MathFormula>w</MathFormula>、<MathFormula>b</MathFormula></> },
            { number: "05", title: "预测与评估", detail: <MathFormula>{String.raw`\hat{y}=x^T\hat{w}+\hat{b}`}</MathFormula> },
          ]}
        />
      </section>

      <LogisticRegressionContent />
    </div>
  );
}
