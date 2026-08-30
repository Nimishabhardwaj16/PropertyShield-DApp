import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("PropertyShieldModule", (m) => {
  const PropertyShield = m.contract("PropertyShield");

  return { PropertyShield };
});
