# chat-space
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unipue: true|
|name|string|null: false, unique: true, add_index: true|
### Association
- has_many :groups_users
- has_many :groups, through: groups_users
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unipue: true|
### Association
- has_many :users, through: groups_users
- has_many :group_users
- has_many :messeages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|foreign_key: true、null: false|
|user_id|integer|foreign_key: true、null: false|
### Association
- belongs_to :user
- belongs_to :group
