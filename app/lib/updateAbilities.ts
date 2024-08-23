// "use client"

// import { Ability, AbilityBuilder } from "@casl/ability";
// import { User } from "./actions";
// import { useAbilityContext } from "./can";


// export function updateAbility(user: User) {
//     console.log("hdjkhad", user)
//     const ability = useAbilityContext();
//   const { can, rules } = new AbilityBuilder(Ability);
//   if (user.isAdmin) {
//     can("manage", "Owner");
//     can("read", "Book");
//     can("update", "Book", { status: true });
//   } else {
//     can("read", "Book", { owner: user.id });
//     can("update", "Book", { owner: user.id });
//     can("upload", "Book");
//   }

//   ability.update(rules);
// }
