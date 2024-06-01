import { Toaster } from "@repo/ui/src/components/toaster";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ConvexReactClient } from "convex/react";
import { useTheme } from "next-themes";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import CrystalDialog from "./crystal-dialog";
import PaymentDialog from "./crystals/payment-dialog";
import { dark } from "@clerk/themes";

const convex = new ConvexReactClient("https://cheery-shrimp-818.convex.cloud");

export function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  return (
    <ClerkProvider
      publishableKey="pk_test_Y2hlZXJmdWwtZ29hdC00NS5jbGVyay5hY2NvdW50cy5kZXYk"
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: "black",
        },
        elements: {
          formFieldInput: "rounded-lg text-foreground bg-background",
          formResendCodeLink: "text-foreground",
          footerActionLink: "text-foreground",
          otpCodeFieldInput: "rounded-lg text-foreground bg-foreground/10",
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <I18nextProvider i18n={i18n} defaultNS={"translation"}>
          <Toaster />
          <CrystalDialog />
          <PaymentDialog />
          <TooltipProvider>{children}</TooltipProvider>
        </I18nextProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
