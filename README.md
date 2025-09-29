# 🌍 MamaCredit - Women's Savings Circles Platform

**Empowering African women through traditional savings circles (Susu/Tontines) powered by Hedera blockchain technology.**

MamaCredit is a decentralized platform that digitizes traditional African women's savings circles, combining cultural financial practices with modern blockchain security. Built for women, by women.

## 🎯 Vision

To create a trusted, transparent, and accessible financial ecosystem where African women can build wealth, support each other, and achieve financial independence through time-tested community savings traditions.

## ✨ Key Features

### 💰 Digital Savings Circles
- **Create & Join Circles**: Start or join savings groups with trusted community members
- **Automated Contributions**: Smart contract-managed monthly contributions
- **Transparent Payouts**: Fair, automated distribution system
- **Member Management**: Invite friends and family to your circles

### 🤝 Sister Guarantee System
- **Trust-Based Onboarding**: New members backed by existing verified sisters
- **Community Verification**: Multi-level guarantee system for security
- **Reputation Building**: Earn MAMA tokens through positive participation

### 🚨 Emergency Loan Support
- **Quick Access**: Urgent financial assistance when needed most
- **Community Voting**: Democratic approval process for emergency requests
- **Flexible Terms**: Reasonable repayment schedules within your circle

### 🛒 Marketplace Integration
- **Buy & Sell**: Trade goods and services within the community
- **MAMA Token Rewards**: Earn tokens for marketplace activity
- **Local Commerce**: Support women-owned businesses

### 🔗 Hedera Blockchain Integration
- **Secure Transactions**: Fast, low-cost, environmentally friendly
- **MAMA Token (HTS)**: Native reward token for platform participation
- **Transparent Records**: All transactions recorded on Hedera Consensus Service
- **Wallet Integration**: Seamless crypto wallet connectivity

## 🛠 Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom African-inspired color palette
- **Blockchain**: Hedera Hashgraph (HBAR, HTS, HCS)
- **State Management**: Zustand
- **UI Components**: Radix UI with custom styling
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Hedera testnet account (for blockchain features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Labi-Joy/mamacredit.git
   cd mamacredit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:
   ```env
   # Hedera Configuration (Testnet)
   NEXT_PUBLIC_HEDERA_NETWORK=testnet
   NEXT_PUBLIC_HEDERA_ACCOUNT_ID=your_account_id
   HEDERA_PRIVATE_KEY=your_private_key

   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📱 Core Functionality

### Dashboard Features
- **Wallet Management**: View HBAR and MAMA token balances
- **Circle Overview**: Track your savings circles and contributions
- **Emergency Loans**: Request or vote on emergency assistance
- **Marketplace**: Browse and list products/services
- **Profile Management**: Update personal information and verification status

### Hedera Integration
- **Smart Contracts**: Automated savings circle management
- **HTS Tokens**: MAMA reward token distribution
- **HCS Logging**: Transparent transaction history
- **Wallet Connect**: Secure wallet integration

## 🎨 Design Philosophy

MamaCredit embraces African design heritage with:
- **Burgundy & Gold**: Colors representing strength and prosperity
- **Earth Tones**: Terracotta and sage reflecting community and growth
- **Cultural Patterns**: Inspired by Kente, Mudcloth, and Ankara designs
- **Accessibility**: Mobile-first design for African mobile usage patterns

## 🔐 Security & Trust

- **Multi-Signature**: Circle transactions require community consensus
- **Sister Guarantee**: New member verification through existing users
- **Hedera Security**: Enterprise-grade blockchain security
- **Privacy Protection**: Personal data encrypted and protected

## 🌍 Social Impact

MamaCredit addresses critical needs in African women's financial empowerment:
- **Financial Inclusion**: Banking for the unbanked
- **Community Building**: Strengthening traditional support systems
- **Economic Empowerment**: Wealth building through collective action
- **Cultural Preservation**: Digitizing traditional financial practices

## 🤝 Contributing

We welcome contributions from developers who share our vision of empowering African women through technology.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **African Women**: The inspiration and driving force behind this platform
- **Hedera Team**: For providing sustainable blockchain infrastructure
- **Traditional Susu/Tontine Systems**: The foundation of our digital innovation
- **Open Source Community**: For the tools and libraries that make this possible

## 📞 Contact & Support

- **Website**: [MamaCredit Live Demo](your-vercel-url)
- **GitHub**: [github.com/Labi-Joy/mamacredit](https://github.com/Labi-Joy/mamacredit)
- **Issues**: Report bugs and request features via GitHub Issues

---

**Built with ❤️ for African women, by the MamaCredit team**

*"When women support women, incredible things happen."*