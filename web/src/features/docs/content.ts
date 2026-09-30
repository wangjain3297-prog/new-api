/*
Copyright (C) 2026 wangjain3297-prog and contributors.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

Based on QuantumNous/new-api (AGPLv3). Documentation content of this
fork is authored in Simplified Chinese by design.
*/

export type DocsBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'code'; lang: string; code: string }

export interface DocsSection {
  id: string
  titleKey: string
  blocks: DocsBlock[]
}

// 棱镜Prism 文档中心正文（简体中文）。标题走 i18n，见 index.tsx。
export const DOCS_SECTIONS: DocsSection[] = [
  {
    id: 'quick-start',
    titleKey: 'Quick Start',
    blocks: [
      {
        type: 'p',
        text: '棱镜Prism 是一个聚合多家 AI 模型厂商的统一 API 网关。注册一个账号、创建一个令牌，即可用 OpenAI 兼容协议调用站内支持的所有模型。',
      },
      {
        type: 'list',
        items: [
          '注册：点击首页右上角「注册」，填写用户名、密码和邮箱，点击「获取验证码」，将邮箱收到的 6 位验证码填入后提交即可完成注册。',
          '验证码 10 分钟内有效；收不到时请检查垃圾邮件文件夹。',
          '登录：使用注册时的用户名（或邮箱）与密码登录。',
          '登录后进入控制台，即可管理令牌、查看用量和余额。',
        ],
      },
    ],
  },
  {
    id: 'api-token',
    titleKey: 'Get an API Token',
    blocks: [
      {
        type: 'p',
        text: '调用 API 前需要先创建一个令牌（Token）。令牌是调用接口的唯一凭证，请妥善保管，泄露后可随时禁用或删除。',
      },
      {
        type: 'list',
        items: [
          '进入控制台 → 「令牌」页面，点击「添加令牌」。',
          '设置令牌名称；可选设置额度上限与过期时间，留空表示不限。',
          '保存后在列表中复制以 sk- 开头的密钥。',
          '令牌额度与账户额度相互独立：令牌额度是单个令牌的可用上限，账户额度是整体的可用余额。',
        ],
      },
      {
        type: 'note',
        text: '令牌只在创建时的弹窗中完整展示一次，请立即复制保存。',
      },
    ],
  },
  {
    id: 'api-usage',
    titleKey: 'API Usage',
    blocks: [
      {
        type: 'p',
        text: '棱镜Prism 完全兼容 OpenAI API 协议。将官方 SDK 或任意 OpenAI 客户端的 Base URL 指向本站点即可，无需修改其他代码。',
      },
      {
        type: 'list',
        items: [
          'Base URL：https://你的站点地址/v1（本地开发环境为 http://localhost:3000/v1）。',
          '鉴权方式：请求头 Authorization: Bearer sk-你的令牌。',
          '支持的接口包括 Chat Completions、Models 等常用 OpenAI 端点。',
          '在请求参数中设置 "stream": true 即可使用流式输出。',
        ],
      },
      {
        type: 'code',
        lang: 'bash',
        code: `curl https://你的站点地址/v1/chat/completions \\
  -H "Authorization: Bearer sk-xxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "你好"}]
  }'`,
      },
      {
        type: 'code',
        lang: 'python',
        code: `from openai import OpenAI

client = OpenAI(
    api_key="sk-xxxxxxxx",
    base_url="https://你的站点地址/v1",
)

resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "你好"}],
)
print(resp.choices[0].message.content)`,
      },
    ],
  },
  {
    id: 'models-pricing',
    titleKey: 'Models & Pricing',
    blocks: [
      {
        type: 'p',
        text: '站内可用模型、分组倍率与按量计费价格可在「模型广场」中查看，实际费用按请求的 token 用量乘以对应模型倍率结算。',
      },
      {
        type: 'list',
        items: [
          '模型广场：查看所有可用模型及其上下文长度、价格倍率。',
          '用量明细：控制台 → 「日志」中可查询每次调用的 token 消耗与费用。',
          '额度充值与兑换请在控制台对应页面操作。',
        ],
      },
    ],
  },
  {
    id: 'faq',
    titleKey: 'FAQ',
    blocks: [
      {
        type: 'list',
        items: [
          '提示 401 无效令牌：检查 Authorization 请求头是否正确、令牌是否被禁用或删除、令牌是否已过期。',
          '提示余额不足：确认账户额度和令牌额度均未用尽。',
          '提示模型不存在：核对模型名称拼写，并确认所选模型在模型广场中可用。',
          '注册验证码收不到：检查邮箱地址是否正确、垃圾邮件文件夹；若仍收不到请联系管理员。',
          '更多部署与运维文档请咨询站点管理员。',
        ],
      },
    ],
  },
]
