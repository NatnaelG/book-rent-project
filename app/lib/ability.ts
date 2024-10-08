import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import type { User } from "./actions";

export default function defineAbilityFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (user.isAdmin) {
    can('read', 'all');
    cannot('read', "/book-upload");
    can("manage", "Owner");
    can("read", "Book");
    can("update", "Book", { status: true });
  } else {
    can('read', 'all');
    cannot('read', "/owners");
    cannot('read', "/books");
    can("read", "Book", { owner: user.id});
    can("update", "Book", { owner: user.id});
    can("upload", "Book")
  }

//   cannot("delete", "Post", { published: true });

  return build();
}

// // import { defineAbility } from '@casl/ability';

// // export default (user: User) => defineAbility((can) => {
// //   if (user.isAdmin) {
// //     can("manage", "Owner");
// //     can("read", "Book");
// //     can("update", "Book", { status: true });
// //   } else {
// //     can("read", "Book", { owner: user.id});
// //     can("update", "Book", { owner: user.id});
// //     can("upload", "Book")
// //   }
// // });