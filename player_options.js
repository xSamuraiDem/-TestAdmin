import { Players, Inventory, Build } from 'pixel_combats/room';

// Список администраторов
var AdminList = [];

// Список разработчиков (список ID)
var dev = [
  "3356B62F867213A3", "C925816BE50844A9",
  "881D3633B88427CF"
];

// Функция для получения значений по умолчанию для нового администратора
const DefaultValue = (p) => ({ "Id": p.id, "Lvl": 1 });

// Функция проверки уровня доступа
// Возвращает true, если уровень доступа игрока (p.Lvl) не меньше, чем заданный уровень (a)
const LvlTarget = (a, b) => (b < a) ? false : true;

// Функция для добавления разработчиков в список администраторов
function DevToAdmin() {
  dev.forEach(id => {
    AdminList.push({ "Id": id, "Lvl": 100 });
  });
}

// Вызываем функцию для добавления разработчиков
DevToAdmin();

// Функция для поиска администратора по ID игрока
function get_player_admin(player) => AdminList.find(admin => admin.Id === player.id);

// Функция для обновления уровня доступа администратора 
export function player_admin(player) {
  const adm = get_player_admin(player);
  if (adm != null) {
    adm.Lvl += 1;
    set_admin_options(adm);
  } else {
    AdminList.push(DefaultValue(player));
  }
}

// Функция для установки прав администратора
export function set_admin_options(admin) {
  if (get_player_admin(admin) == null) return;

  player_set_editor_inventory(admin.Id);
  player_set_editor_options(admin.Id);
}

// Разрешаем все что можно для редактора
function player_set_editor_inventory(player_id) {
  const pInventory = Inventory.GetContext(Players.Get(player_id));
  const p = get_player_admin(Players.Get(player_id));

  pInventory.Main.Value = LvlTarget(5, p.Lvl); // Разрешаем оружие
  pInventory.Secondary.Value = LvlTarget(5, p.Lvl); // Разрешаем второстепенное оружие
  pInventory.Melee.Value = LvlTarget(); // Удалили, так как значение по умолчанию
  pInventory.Explosive.Value = LvlTarget(5, p.Lvl); // Разрешаем взрывчатку
  pInventory.Build.Value = LvlTarget(); // Удалили, так как значение по умолчанию
}

function player_set_editor_options(player_id) {
  const pBuild = Build.GetContext(Players.Get(player_id));
  const p = get_player_admin(Players.Get(player_id));

  pBuild.Pipette.Value = LvlTarget(); // Удалили, так как значение по умолчанию
  pBuild.FloodFill.Value = LvlTarget(10, p.Lvl); // Разрешаем заливку
  pBuild.FillQuad.Value = LvlTarget(10, p.Lvl); // Разрешаем заполнение квадрата
  pBuild.RemoveQuad.Value = LvlTarget(10, p.Lvl); // Разрешаем удаление квадрата
  pBuild.BalkLenChange.Value = LvlTarget(5, p.Lvl); // Разрешаем изменение длины балки
  pBuild.FlyEnable.Value = LvlTarget(); // Удалили, так как значение по умолчанию
  pBuild.SetSkyEnable.Value = LvlTarget(); // Удалили, так как значение по умолчанию
  pBuild.GenMapEnable.Value = LvlTarget(); // Удалили, так как значение по умолчанию
  pBuild.ChangeCameraPointsEnable.Value = LvlTarget(); // Удалили, так как значение по умолчанию
  pBuild.QuadChangeEnable.Value = LvlTarget(5, p.Lvl); // Разрешаем изменение квадрата
  pBuild.BuildModeEnable.Value = LvlTarget(5, p.Lvl); // Разрешаем изменение режима строительства
  pBuild.CollapseChangeEnable.Value = LvlTarget(100, p.Lvl); // Разрешаем изменение коллапса
  pBuild.RenameMapEnable.Value = LvlTarget(); // Удалили, так как значение по умолчанию
  pBuild.ChangeMapAuthorsEnable.Value = LvlTarget(100, p.Lvl); // Разрешаем изменение авторов карты
  pBuild.LoadMapEnable.Value = LvlTarget(); // Удалили, так как значение по умолчанию
  pBuild.ChangeSpawnsEnable.Value = LvlTarget(100, p.Lvl); // Разрешаем изменение точек спавна
  pBuild.BuildRangeEnable.Value = LvlTarget(100, p.Lvl); // Разрешаем изменение области строительства
}
