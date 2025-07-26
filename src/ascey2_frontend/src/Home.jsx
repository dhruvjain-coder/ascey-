import React, { useState, useEffect } from "react";

import { Principal } from "@dfinity/principal"; // Import Principal

import { useAuth } from "./use-auth-client";
import './index.css';
import { motion } from "framer-motion"
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Shield,
  Users,
  BarChart,
  Layers,
  TrendingUp,
  Clock,
  Globe,
  Code,
  Wallet,
  Play,
  ExternalLink,
  Github,
  FileText,
  Building,
  Coins,
  Lock,
} from "lucide-react"

function Home() {
  //token names
  const [tokenName, setTokenName] = useState("");
 const [icptokenName, setIcpTokenName] = useState("");
  const [TommytokenName, setTommyName] = useState("");
  //const [logoUrl, setLogoUrl] = useState("");
  //token balances
  const [balance, setBalance] = useState(0n); // Keep balance as BigInt
  const [Icpbalance, setIcpBalance] = useState(0n); // Keep balance as BigInt
  const [Tommybalance, setTommyBalance] = useState(0n); // Keep balance as BigInt
  const [accountTransactions, setAccountTransactions] = useState([]);
  const { whoamiActor, icrcIndexActor, icpActor, tommy_Actor, isAuthenticated } = useAuth();
  const { principal } = useAuth();
 const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const keyFeatures = [
    {
      title: "Real-Time Settlement",
      description: "Instant trade execution and settlement powered by blockchain technology.",
      icon: <Clock className="size-5" />,
      tooltip: "Trades settle in seconds, not days",
    },
    {
      title: "Fractional Ownership",
      description: "Access high-value assets with minimal capital requirements.",
      icon: <Coins className="size-5" />,
      tooltip: "Own fractions of expensive assets",
    },
    {
      title: "Regulatory Compliance",
      description: "Built-in compliance framework ensuring legal and regulatory adherence.",
      icon: <Shield className="size-5" />,
      tooltip: "Fully compliant with financial regulations",
    },
    {
      title: "Global Accessibility",
      description: "24/7 trading access from anywhere in the world.",
      icon: <Globe className="size-5" />,
      tooltip: "Trade anytime, anywhere",
    },
    {
      title: "Advanced Analytics",
      description: "Real-time market data and comprehensive portfolio insights.",
      icon: <BarChart className="size-5" />,
      tooltip: "Deep market analytics and reporting",
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade security with multi-layer protection protocols.",
      icon: <Lock className="size-5" />,
      tooltip: "Military-grade encryption and security",
    },
  ]

  const audiences = [
    {
      title: "Retail Investors",
      description: "Access institutional-grade assets with lower barriers to entry",
      icon: <Users className="size-6" />,
      benefits: ["Fractional ownership", "Lower fees", "24/7 trading", "Global access"],
    },
    {
      title: "Institutional Stakeholders",
      description: "Streamline operations and unlock new revenue opportunities",
      icon: <Building className="size-6" />,
      benefits: ["Reduced settlement time", "Lower operational costs", "New asset classes", "Compliance automation"],
    },
    {
      title: "Developers & Partners",
      description: "Build on our robust infrastructure with comprehensive APIs",
      icon: <Code className="size-6" />,
      benefits: ["Rust SDK", "ICP integration", "Comprehensive docs", "Developer support"],
    },
  ]


  // Fetch token details (name and logo) and user balance on load
  async function fetchData(principalId) {
    try {
      // Use principalId directly if it's a Principal object
      const owner = typeof principalId === 'string' ? Principal.fromText(principalId) : principalId;

      // Fetch token name
      const name = await whoamiActor.icrc1_name();
      setTokenName(name);

      const icptokenname = await icpActor.icrc1_symbol();
      setIcpTokenName(icptokenname);

      const tommyTokenname = await tommy_Actor.icrc1_name();
      setTommyName(tommyTokenname);

      // Fetch logo URL
      // const logo = await whoamiActor.icrc1_metadata();
      // setLogoUrl(logo);

      // Fetch user token balances
      const balanceResult = await whoamiActor.icrc1_balance_of({
        owner, // Use the Principal object directly
        subaccount: [],
      });
      const numericBalanceMercx = Number(balanceResult);
      const after_ap = numericBalanceMercx / 1e8;
      setBalance(after_ap);

      // Fetch icp balance
      const balanceicp = await icpActor.icrc1_balance_of({
        owner, // Use the Principal object directly
        subaccount: [],
      });
      const numericBalanceIcp = Number(balanceicp);
      const after_app = numericBalanceIcp / 1e8;
      setIcpBalance(after_app);

      const balanceTommy = await tommy_Actor.icrc1_balance_of({
        owner, // Use the Principal object directly
        subaccount: [],
      });
      const numericBalanceTommy = Number(balanceTommy);
      const after_ap_tommy = numericBalanceTommy / 1e8;
      setTommyBalance(after_ap_tommy);

      // Fetch latest transactions
      // const txResponse = await whoamiActor.get_transactions(0, 50);
      // if (txResponse?.Ok?.transactions) {
      //   setTransactions(txResponse.Ok.transactions);
      // }

      // Fetch account transactions
      const accountTransactionsArgs = {
        account: {
          owner,  // Principal object directly
          subaccount: [],  // Optional subaccount
        },
        start: [],  // Adjust the starting point for pagination
        max_results: 30n,  // Pass max_results inside the same record
      };

      const accountTxResponse = await icrcIndexActor.get_account_transactions(accountTransactionsArgs);

      if (accountTxResponse?.Ok?.transactions) {
        setAccountTransactions(accountTxResponse.Ok.transactions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Fetch data once the principal ID is available
  useEffect(() => {
    if (principal) {
      fetchData(principal);  // Fetch data when principal and actor are available
    }
  }, [principal, balance, accountTransactions]);




  return (

 <div className="flex min-h-[100dvh] flex-col bg-black text-white">
     

      <main className="flex flex-col justify-center items-center w-full">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden relative flex flex-col items-center"> 
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto mb-12"
            >
              <div
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-blue-500/10 text-blue-400 border-blue-500/20 w-fit mx-auto"
                variant="secondary"
              >
                Powered by Internet Computer Protocol
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
                Real World Assets.
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Reinvented on Blockchain.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Transform traditional capital markets with tokenized real-world assets. Access EGX30 tokens, fractional
                ownership, and instant settlement on a compliant, decentralized platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div
                  size="lg"
                  className="flex justify-center items-center rounded-full h-12 px-8 text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <h1 className="text-white">Get Started</h1>
                  <ArrowRight className="ml-2 size-4" />
                </div>
                <div
                  size="lg"
                  variant="outline"
                  className="rounded-full flex justify-center items-center h-12 px-8 text-base border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <h1 className="text-white">Explore EGX30 Tokens</h1>
                  <TrendingUp className="ml-2 size-4" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-blue-400" />
                  <span>Regulatory Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-blue-400" />
                  <span>Real-Time Settlement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-blue-400" />
                  <span>24/7 Trading</span>
                </div>
              </div>
            </motion.div>

            {/* 3D Token Animation Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm">
                <div className="aspect-video bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-black/50 flex items-center justify-center relative overflow-hidden">
                  {/* Animated background elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 rounded-full blur-lg animate-ping"></div>
                  </div>

                  {/* Token representation */}
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4 animate-bounce">
                      <Coins className="size-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">EGX30 Tokenization</h3>
                    <p className="text-gray-300">Real-time asset tokenization in action</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl opacity-70"></div>
              <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-3xl opacity-70"></div>
            </motion.div>
          </div>
        </section>

        {/* Platform Overview */}
        <section id="platform" className="w-full py-20 md:py-32 border-y border-white/10 bg-white/5 flex flex-col items-center">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-blue-500/10 text-blue-400 border-blue-500/20 w-fit mx-auto">
                Platform Overview
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
                Transforming Capital Markets
              </h2>
              <p className="max-w-3xl mx-auto text-gray-300 md:text-lg">
                Ascey bridges traditional finance and blockchain technology, enabling seamless tokenization of
                real-world assets with institutional-grade security and compliance.
              </p>
            </motion.div>

            {/* Traditional vs Ascey Comparison */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-full bg-red-500/10 border-red-500/20">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-4">Traditional Trading</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center gap-2">
                        <X className="size-4 text-red-400" />
                        <span>T+2 settlement periods</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <X className="size-4 text-red-400" />
                        <span>High minimum investments</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <X className="size-4 text-red-400" />
                        <span>Limited trading hours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <X className="size-4 text-red-400" />
                        <span>Complex compliance processes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <X className="size-4 text-red-400" />
                        <span>Geographic restrictions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="h-full bg-green-500/10 border-green-500/20">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Ascey RWA Platform</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-green-400" />
                        <span>Instant settlement</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-green-400" />
                        <span>Fractional ownership</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-green-400" />
                        <span>24/7 global trading</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-green-400" />
                        <span>Automated compliance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-4 text-green-400" />
                        <span>Borderless access</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="w-full py-20 md:py-32 flex flex-col items-center">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-blue-500/10 text-blue-400 border-blue-500/20 w-fit mx-auto">
                Key Features
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
                Built for the Future of Finance
              </h2>
              <p className="max-w-3xl mx-auto text-gray-300 md:text-lg">
                Our comprehensive platform provides everything you need to participate in the tokenized economy.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {keyFeatures.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <div className="h-full bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <div className="p-6 flex flex-col h-full">
                      <div className="size-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                      <p className="text-gray-300 mb-4 flex-grow">{feature.description}</p>
                      <div className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full inline-block">
                        {feature.tooltip}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Business Impact */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-black relative flex flex-col items-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.1),transparent_50%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-blue-500/10 text-blue-400 border-blue-500/20 w-fit mx-auto">
                Business Impact
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
                Transforming Capital Markets
              </h2>
              <p className="max-w-3xl mx-auto text-gray-300 md:text-lg">
                Ascey is revolutionizing how assets are traded, owned, and managed in the digital economy.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {audiences.map((audience, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="h-full bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-6 text-center">
                      <div className="size-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 mb-4 mx-auto">
                        {audience.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">{audience.title}</h3>
                      <p className="text-gray-300 mb-4">{audience.description}</p>
                      <ul className="space-y-2 text-sm text-gray-400">
                        {audience.benefits.map((benefit, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <Check className="size-3 text-blue-400" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Growth Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              {[
                { value: "90%", label: "Lower Barriers" },
                { value: "24/7", label: "Trading Access" },
                { value: "<1s", label: "Settlement Time" },
                { value: "100%", label: "Compliance" },
              ].map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {metric.value}
                  </div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full py-20 md:py-32 border-y border-white/10 flex flex-col items-center">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-blue-500/10 text-blue-400 border-blue-500/20 w-fit mx-auto">
                How It Works
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
                Simple Process, Powerful Results
              </h2>
              <p className="max-w-3xl mx-auto text-gray-300 md:text-lg">
                Get started with tokenized assets in three simple steps.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative max-w-4xl mx-auto">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Register",
                  description: "Create your account and complete KYC verification in minutes.",
                  icon: <Users className="size-6" />,
                },
                {
                  step: "02",
                  title: "Choose Asset",
                  description: "Browse and select from our curated portfolio of tokenized real-world assets.",
                  icon: <Coins className="size-6" />,
                },
                {
                  step: "03",
                  title: "Trade & Manage",
                  description: "Start trading with instant settlement and manage your portfolio 24/7.",
                  icon: <TrendingUp className="size-6" />,
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <div className="size-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400 mb-2">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-12"
            >
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Play className="mr-2 size-4" />
                Watch Demo Video
              </div>
            </motion.div>
          </div>
        </section>

        {/* Developer/Partner Section */}
        <section id="developers" className="w-full py-20 md:py-32 bg-white/5 flex flex-col items-center">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-blue-500/10 text-blue-400 border-blue-500/20 w-fit mx-auto">
                For Developers
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">Build on Ascey</h2>
              <p className="max-w-3xl mx-auto text-gray-300 md:text-lg">
                Leverage our robust infrastructure and comprehensive APIs to build the next generation of financial
                applications.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-full bg-white/5 border-white/10">
                  <div className="p-6">
                    <div className="size-12 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-orange-400 mb-4">
                      <Code className="size-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Rust SDK</h3>
                    <p className="text-gray-300 mb-4">
                      Build high-performance applications with our comprehensive Rust SDK, optimized for the Internet
                      Computer Protocol.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="size-3 text-blue-400" />
                        <span>Type-safe API bindings</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-3 text-blue-400" />
                        <span>Comprehensive examples</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-3 text-blue-400" />
                        <span>Active community support</span>
                      </li>
                    </ul>
                    <div className="flex gap-3">
                      <div
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Github className="mr-2 size-4" />
                        GitHub
                      </div>
                      <div
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <FileText className="mr-2 size-4" />
                        Docs
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="h-full bg-white/5 border-white/10">
                  <div className="p-6">
                    <div className="size-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 mb-4">
                      <Layers className="size-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">ICP Integration</h3>
                    <p className="text-gray-300 mb-4">
                      Seamlessly integrate with the Internet Computer Protocol for scalable, secure, and efficient dApp
                      development.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="size-3 text-blue-400" />
                        <span>Canister smart contracts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-3 text-blue-400" />
                        <span>Web-speed performance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-3 text-blue-400" />
                        <span>Reverse gas model</span>
                      </li>
                    </ul>
                    <div className="flex gap-3">
                      <div
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <ExternalLink className="mr-2 size-4" />
                        Learn More
                      </div>
                      <div
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Code className="mr-2 size-4" />
                        Examples
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mt-12"
            >
              <p className="text-gray-400 mb-4">Ready to start building?</p>
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Access Developer Portal
                <ArrowRight className="ml-2 size-4" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full flex flex-col items-center py-20 md:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Ready to Enter the Tokenized Economy?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Join the future of finance with Ascey's revolutionary RWA tokenization platform. Start trading
                real-world assets with blockchain efficiency today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div
                  size="lg"
                  variant="secondary"
                  className="rounded-full flex justify-center items-center h-12 px-20 text-base bg-white text-blue-600 hover:bg-white/90"
                >
                  <h1 className="text-blue-600">Get Started Now</h1>
                  <ArrowRight className="ml-2 size-4" />
                </div>
                <div
                  size="lg"
                  variant="outline"
                  className="rounded-full flex justify-center items-center h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                >
                  <Wallet className="mr-2 size-4" />
                  <h1 className="text-white">Connect Wallet</h1>
                </div>
              </div>
              <p className="text-sm text-white/70 mt-4">Regulatory compliant • Instant settlement • 24/7 trading</p>
            </motion.div>
          </div>
        </section>
      </main>

   
    </div>

  );
}

export default () => (

  <Home />

);


