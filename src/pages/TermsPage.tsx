import React from 'react'

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-fluent-text dark:text-fluent-dark-text mb-2">
          用户协议
        </h1>
        <p className="text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
          请仔细阅读以下用户协议和隐私政策
        </p>
      </div>

      <div className="fluent-card dark:fluent-card-dark p-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-3">
            1. 服务条款
          </h2>
          <div className="space-y-3 text-sm text-fluent-text dark:text-fluent-dark-text">
            <p>
              欢迎使用BreathAI（灵息AI）对话平台。本协议是您与BreathAI之间关于使用本服务的法律协议。
            </p>
            <p>
              通过使用我们的服务，您同意遵守本协议的所有条款和条件。如果您不同意这些条款，请不要使用我们的服务。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-3">
            2. 服务描述
          </h2>
          <div className="space-y-3 text-sm text-fluent-text dark:text-fluent-dark-text">
            <p>
              BreathAI是一个基于人工智能的对话平台，提供多种AI模型的对话服务，包括但不限于：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>文本生成和对话服务</li>
              <li>代码生成和技术支持</li>
              <li>多模态内容处理</li>
              <li>实时流式对话</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-3">
            3. 用户责任
          </h2>
          <div className="space-y-3 text-sm text-fluent-text dark:text-fluent-dark-text">
            <p>
              作为BreathAI的用户，您同意：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>提供准确、真实的注册信息</li>
              <li>妥善保管您的API密钥和账户信息</li>
              <li>不使用服务进行任何非法或有害活动</li>
              <li>不生成或传播虚假信息、恶意内容</li>
              <li>尊重知识产权，不侵犯他人权益</li>
              <li>遵守所有适用的法律法规</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-3">
            4. 隐私政策
          </h2>
          <div className="space-y-3 text-sm text-fluent-text dark:text-fluent-dark-text">
            <p>
              我们重视您的隐私保护：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>我们收集必要的个人信息以提供服务</li>
              <li>对话内容可能用于改进服务质量</li>
              <li>我们采用行业标准的安全措施保护数据</li>
              <li>不会向第三方出售或租借您的个人信息</li>
              <li>您有权访问、更正或删除您的个人信息</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-3">
            5. 知识产权
          </h2>
          <div className="space-y-3 text-sm text-fluent-text dark:text-fluent-dark-text">
            <p>
              关于知识产权的约定：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>BreathAI平台及其内容受知识产权法保护</li>
              <li>用户生成内容的所有权归用户所有</li>
              <li>您授予我们使用您的内容以改进服务的权利</li>
              <li>不得复制、修改或分发我们的专有内容</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-3">
            6. 服务限制
          </h2>
          <div className="space-y-3 text-sm text-fluent-text dark:text-fluent-dark-text">
            <p>
              以下行为被明确禁止：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>试图绕过或破解我们的安全措施</li>
              <li>使用自动化工具批量访问服务</li>
              <li>干扰或破坏服务的正常运行</li>
              <li>商业转售或分发我们的服务</li>
              <li>违反技术使用限制或配额</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-3">
            7. 免责声明
          </h2>
          <div className="space-y-3 text-sm text-fluent-text dark:text-fluent-dark-text">
            <p>
              重要免责事项：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>AI生成内容可能存在错误或不准确</li>
              <li>我们不保证服务的持续可用性</li>
              <li>用户对使用AI结果承担最终责任</li>
              <li>服务按"现状"提供，不提供任何明示或暗示的保证</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-3">
            8. 服务变更和终止
          </h2>
          <div className="space-y-3 text-sm text-fluent-text dark:text-fluent-dark-text">
            <p>
              我们保留以下权利：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>随时修改或终止服务</li>
              <li>更新本协议条款</li>
              <li>暂停或终止违反协议的用户账户</li>
              <li>因技术或商业原因调整服务功能</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-3">
            9. 争议解决
          </h2>
          <div className="space-y-3 text-sm text-fluent-text dark:text-fluent-dark-text">
            <p>
              如发生争议，我们建议：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>首先通过友好协商解决</li>
              <li>联系我们的客服团队寻求帮助</li>
              <li>如协商无效，可通过法律途径解决</li>
              <li>本协议适用中华人民共和国法律</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-3">
            10. 联系我们
          </h2>
          <div className="space-y-3 text-sm text-fluent-text dark:text-fluent-dark-text">
            <p>
              如有任何问题或建议，请通过以下方式联系我们：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>QQ群：180522359</li>
              <li>官方网站：<a href="https://breathai.top" className="text-fluent-primary hover:underline">https://breathai.top</a></li>
              <li>API文档：<a href="https://chat.breathai.top" className="text-fluent-primary hover:underline">https://chat.breathai.top</a></li>
            </ul>
          </div>
        </section>

        <section className="border-t border-fluent-border dark:border-fluent-dark-border pt-4">
          <p className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
            本协议最后更新时间：2024年11月
          </p>
          <p className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-1">
            继续使用BreathAI服务即表示您同意本协议的所有条款。
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsPage
