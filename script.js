(function () {
  "use strict";

  const GEN_STORAGE_KEY = "sob_gen_history_v1";
  const WORK_STORAGE_KEY = "sob_work_state_v1";
  const MODE_STORAGE_KEY = "sob_app_mode_v1";

  // Выписка из Таблиц стрельбы 122-мм гаубицы Д-30 (ТС №145, ОФ-462Ж / ОФ-462)
  // Формат строки: [Дальность (м), Прицел механический (дел), Прицел (тыс), ΔХтыс (м), Вд (м), Z (тыс)]
  const TS_D30 = {
    full: {
      label: "Полный (V₀ 690 м/с)",
      cmdLabel: "Полный",
      rows: [
        [3000, 60, 33, 61, 14, 1],
        [3200, 64, 37, 59, 14, 1],
        [3400, 68, 40, 57, 14, 1],
        [3600, 72, 44, 55, 13, 1],
        [3800, 76, 47, 53, 13, 1],
        [4000, 80, 51, 51, 13, 1],
        [4200, 84, 55, 49, 13, 1],
        [4400, 88, 59, 47, 12, 1],
        [4600, 92, 64, 45, 12, 1],
        [4800, 96, 68, 43, 12, 1],
        [5000, 100, 73, 41, 11, 1],
        [5200, 104, 77, 39, 11, 2],
        [5400, 108, 82, 38, 11, 2],
        [5600, 112, 88, 36, 11, 2],
        [5800, 116, 93, 35, 12, 2],
        [6000, 120, 99, 34, 12, 2],
        [6200, 124, 105, 33, 12, 2],
        [6400, 128, 111, 32, 13, 2],
        [6600, 132, 117, 31, 13, 2],
        [6800, 136, 124, 30, 13, 3],
        [7000, 140, 130, 30, 14, 3],
        [7200, 144, 137, 29, 14, 3],
        [7400, 148, 144, 28, 14, 4],
        [7600, 152, 151, 27, 14, 4],
        [7800, 156, 159, 26, 14, 4],
        [8000, 160, 167, 26, 15, 4],
        [8200, 164, 174, 25, 15, 4],
        [8400, 168, 182, 24, 15, 5],
        [8600, 172, 191, 23, 16, 5],
        [8800, 176, 199, 23, 16, 5],
        [9000, 180, 208, 22, 17, 5],
        [9200, 184, 217, 22, 17, 6],
        [9400, 188, 226, 21, 17, 6],
        [9600, 192, 235, 21, 17, 6],
        [9800, 196, 245, 20, 18, 6],
        [10000, 200, 254, 20, 18, 7],
        [10200, 204, 264, 20, 18, 7],
        [10400, 208, 274, 19, 18, 7],
        [10600, 212, 285, 19, 18, 8],
        [10800, 216, 295, 18, 19, 8],
        [11000, 220, 306, 18, 19, 8],
        [11200, 224, 317, 18, 19, 8],
        [11400, 228, 329, 17, 19, 9],
        [11600, 232, 341, 17, 19, 9],
        [11800, 236, 353, 17, 20, 9],
        [12000, 240, 365, 16, 20, 10],
        [12200, 244, 378, 16, 20, 10],
        [12400, 248, 391, 15, 20, 10],
        [12600, 252, 405, 15, 21, 11],
        [12800, 256, 419, 14, 21, 11],
        [13000, 260, 434, 14, 22, 11],
        [13200, 264, 449, 13, 22, 12],
        [13400, 268, 464, 12, 22, 12],
        [13600, 272, 481, 11, 23, 13],
        [13800, 276, 499, 11, 23, 13],
        [14000, 280, 517, 10, 24, 14],
        [14200, 284, 537, 9, 24, 15],
        [14400, 288, 558, 8, 25, 15],
        [14600, 292, 582, 7, 25, 16],
        [14800, 296, 609, 6, 26, 17],
        [15000, 300, 641, 4, 26, 19],
        [15200, 304, 686, 2, 27, 20]
      ]
    },
    reduced: {
      label: "Уменьшенный (V₀ 565 м/с)",
      cmdLabel: "Уменьшенный",
      rows: [
        [3000, 60, 53, 37, 11, 1],
        [3200, 64, 58, 36, 11, 1],
        [3400, 68, 64, 34, 12, 1],
        [3600, 72, 69, 33, 12, 2],
        [3800, 76, 75, 32, 12, 2],
        [4000, 80, 82, 31, 12, 2],
        [4200, 84, 88, 30, 13, 2],
        [4400, 88, 95, 29, 13, 2],
        [4600, 92, 102, 28, 13, 2],
        [4800, 96, 109, 27, 13, 2],
        [5000, 100, 117, 27, 14, 3],
        [5200, 104, 124, 26, 14, 3],
        [5400, 108, 132, 26, 15, 3],
        [5600, 112, 140, 25, 15, 3],
        [5800, 116, 148, 24, 15, 3],
        [6000, 120, 156, 23, 16, 4],
        [6200, 124, 165, 22, 16, 4],
        [6400, 128, 174, 22, 16, 4],
        [6600, 132, 183, 22, 17, 4],
        [6800, 136, 192, 21, 17, 5],
        [7000, 140, 201, 21, 17, 5],
        [7200, 144, 211, 20, 17, 5],
        [7400, 148, 221, 20, 18, 5],
        [7600, 152, 231, 19, 18, 6],
        [7800, 156, 241, 19, 18, 6],
        [8000, 160, 252, 18, 19, 6],
        [8200, 164, 263, 18, 19, 7],
        [8400, 168, 274, 18, 20, 7],
        [8600, 172, 285, 18, 20, 7],
        [8800, 176, 296, 17, 20, 7],
        [9000, 180, 308, 17, 21, 7],
        [9200, 184, 320, 16, 21, 7],
        [9400, 188, 332, 16, 21, 7],
        [9600, 192, 345, 15, 21, 7],
        [9800, 196, 358, 15, 22, 8],
        [10000, 200, 372, 14, 22, 8],
        [10200, 204, 386, 14, 22, 8],
        [10400, 208, 400, 13, 23, 9],
        [10600, 212, 415, 13, 23, 9],
        [10800, 216, 431, 12, 24, 9],
        [11000, 220, 447, 12, 24, 10],
        [11200, 224, 464, 11, 24, 10],
        [11400, 228, 483, 10, 25, 11],
        [11600, 232, 502, 10, 25, 11],
        [11800, 236, 523, 9, 25, 12],
        [12000, 240, 546, 8, 26, 13],
        [12200, 244, 570, 7, 26, 14],
        [12400, 248, 599, 6, 27, 15],
        [12600, 252, 635, 3, 28, 16],
        [12800, 256, 695, 1, 28, 18]
      ]
    },
    "1": {
      label: "1-й (V₀ 493 м/с)",
      cmdLabel: "1",
      rows: [
        [3000, 76, 75, 28, 10, 2],
        [3200, 80, 82, 27, 10, 2],
        [3400, 85, 89, 26, 10, 2],
        [3600, 89, 97, 26, 11, 2],
        [3800, 94, 105, 25, 11, 2],
        [4000, 98, 112, 24, 12, 2],
        [4200, 102, 120, 24, 12, 2],
        [4400, 107, 129, 23, 12, 2],
        [4600, 111, 138, 23, 12, 2],
        [4800, 115, 147, 22, 12, 2],
        [5000, 120, 156, 22, 13, 3],
        [5200, 124, 165, 21, 13, 3],
        [5400, 129, 175, 21, 13, 3],
        [5600, 133, 185, 21, 14, 4],
        [5800, 137, 194, 21, 14, 4],
        [6000, 141, 204, 20, 15, 5],
        [6200, 146, 215, 20, 15, 5],
        [6400, 150, 225, 19, 16, 5],
        [6600, 154, 236, 19, 16, 5],
        [6800, 158, 247, 19, 16, 5],
        [7000, 162, 258, 18, 17, 6],
        [7200, 166, 269, 18, 17, 6],
        [7400, 171, 281, 17, 17, 6],
        [7600, 175, 293, 17, 17, 6],
        [7800, 179, 305, 17, 17, 6],
        [8000, 183, 318, 16, 18, 7],
        [8200, 188, 331, 16, 18, 7],
        [8400, 192, 344, 15, 18, 7],
        [8600, 196, 358, 15, 19, 8],
        [8800, 200, 372, 14, 19, 8],
        [9000, 204, 386, 14, 20, 9],
        [9200, 208, 401, 13, 20, 9],
        [9400, 212, 417, 12, 21, 10],
        [9600, 217, 433, 12, 21, 10],
        [9800, 221, 450, 11, 22, 11],
        [10000, 225, 468, 10, 23, 11],
        [10200, 229, 487, 10, 23, 12],
        [10400, 233, 508, 9, 24, 12],
        [10600, 237, 530, 8, 24, 13],
        [10800, 242, 555, 7, 25, 14],
        [11000, 246, 582, 6, 26, 15],
        [11200, 250, 616, 4, 26, 16],
        [11400, 254, 661, 1, 27, 17]
      ]
    },
    "2": {
      label: "2-й (V₀ 417 м/с)",
      cmdLabel: "2",
      rows: [
        [3000, 61, 108, 22, 10, 2],
        [3200, 65, 117, 22, 10, 2],
        [3400, 69, 126, 21, 10, 2],
        [3600, 73, 135, 21, 10, 2],
        [3800, 77, 145, 20, 10, 2],
        [4000, 81, 155, 20, 11, 3],
        [4200, 85, 165, 19, 11, 3],
        [4400, 89, 175, 19, 11, 3],
        [4600, 93, 186, 18, 12, 3],
        [4800, 97, 197, 18, 12, 3],
        [5000, 101, 208, 18, 13, 4],
        [5200, 105, 219, 17, 13, 4],
        [5400, 109, 231, 17, 13, 4],
        [5600, 113, 242, 16, 13, 5],
        [5800, 117, 254, 16, 13, 5],
        [6000, 121, 266, 15, 14, 6],
        [6200, 125, 279, 15, 14, 6],
        [6400, 129, 291, 15, 14, 6],
        [6600, 133, 305, 14, 15, 6],
        [6800, 137, 318, 14, 15, 6],
        [7000, 141, 332, 13, 16, 7],
        [7200, 145, 346, 13, 16, 7],
        [7400, 149, 361, 13, 17, 8],
        [7600, 153, 376, 12, 17, 8],
        [7800, 157, 392, 12, 18, 8],
        [8000, 161, 409, 12, 19, 9],
        [8200, 165, 426, 11, 19, 9],
        [8400, 169, 444, 11, 20, 9],
        [8600, 173, 463, 10, 20, 10],
        [8800, 177, 483, 10, 21, 10],
        [9000, 181, 504, 9, 21, 11],
        [9200, 185, 528, 8, 22, 12],
        [9400, 189, 555, 7, 22, 13],
        [9600, 193, 586, 6, 23, 14],
        [9800, 197, 624, 4, 23, 15],
        [10000, 202, 685, 1, 24, 16]
      ]
    },
    "3": {
      label: "3-й (V₀ 335 м/с)",
      cmdLabel: "3",
      rows: [
        [3000, 44, 148, 18, 14, 3],
        [3200, 47, 160, 18, 15, 3],
        [3400, 50, 171, 17, 17, 3],
        [3600, 53, 183, 17, 18, 3],
        [3800, 56, 195, 16, 19, 3],
        [4000, 59, 207, 16, 20, 4],
        [4200, 62, 220, 15, 21, 4],
        [4400, 65, 233, 15, 23, 4],
        [4600, 68, 246, 15, 25, 4],
        [4800, 71, 259, 14, 26, 4],
        [5000, 74, 273, 14, 27, 5],
        [5200, 78, 287, 14, 29, 5],
        [5400, 81, 302, 13, 30, 6],
        [5600, 84, 317, 13, 32, 6],
        [5800, 87, 333, 12, 33, 6],
        [6000, 90, 349, 12, 35, 7],
        [6200, 93, 366, 11, 37, 7],
        [6400, 96, 384, 11, 39, 7],
        [6600, 99, 402, 10, 41, 8],
        [6800, 102, 422, 10, 43, 8],
        [7000, 106, 443, 9, 45, 9],
        [7200, 109, 466, 8, 47, 10],
        [7400, 112, 490, 7, 49, 11],
        [7600, 115, 517, 6, 51, 12],
        [7800, 119, 549, 5, 54, 13],
        [8000, 121, 586, 4, 57, 14],
        [8200, 125, 637, 1, 60, 16]
      ]
    },
    "4": {
      label: "4-й (V₀ 276 м/с)",
      cmdLabel: "4",
      rows: [
        [2000, 40, 135, 14, 10, 3],
        [2200, 44, 150, 13, 11, 3],
        [2400, 48, 165, 13, 12, 3],
        [2600, 52, 180, 13, 12, 3],
        [2800, 56, 196, 12, 13, 3],
        [3000, 60, 212, 12, 14, 4],
        [3200, 64, 228, 12, 15, 4],
        [3400, 68, 245, 11, 16, 4],
        [3600, 72, 263, 11, 17, 5],
        [3800, 76, 281, 11, 18, 5],
        [4000, 80, 299, 10, 20, 6],
        [4200, 84, 319, 10, 22, 6],
        [4400, 88, 339, 9, 24, 6],
        [4600, 92, 361, 9, 25, 7],
        [4800, 96, 383, 8, 26, 7],
        [5000, 100, 407, 8, 27, 8],
        [5200, 104, 433, 7, 28, 9],
        [5400, 108, 461, 6, 30, 10],
        [5600, 112, 492, 6, 32, 11],
        [5800, 116, 527, 5, 34, 12],
        [6000, 120, 569, 4, 36, 13],
        [6200, 124, 625, 1, 38, 15]
      ]
    }
  };



  const TS_D30_MORT = {"full": {"label": "Полный (мортирная)", "cmdLabel": "Полный", "rows": [[9800, 0, 1163, 27, 20, 100], [10000, 0, 1155, 26, 20, 94], [10200, 0, 1147, 25, 21, 89], [10400, 0, 1139, 24, 21, 85], [10600, 0, 1131, 24, 22, 82], [10800, 0, 1123, 23, 22, 79], [11000, 0, 1114, 23, 23, 76], [11200, 0, 1105, 22, 23, 73], [11400, 0, 1097, 22, 23, 70], [11600, 0, 1088, 21, 24, 67], [11800, 0, 1079, 21, 24, 65], [12000, 0, 1069, 20, 24, 62], [12200, 0, 1059, 20, 25, 60], [12400, 0, 1049, 19, 25, 58], [12600, 0, 1039, 18, 25, 56], [12800, 0, 1029, 18, 26, 54], [13000, 0, 1018, 17, 26, 52], [13200, 0, 1006, 16, 26, 50], [13400, 0, 993, 15, 26, 48], [13600, 0, 980, 14, 27, 46], [13800, 0, 966, 13, 27, 44], [14000, 0, 952, 13, 27, 41], [14200, 0, 935, 12, 27, 39], [14400, 0, 918, 11, 27, 37], [14600, 0, 898, 10, 27, 34], [14800, 0, 874, 9, 28, 32], [15000, 0, 845, 7, 28, 29], [15200, 0, 802, 5, 28, 26]]}, "reduced": {"label": "Уменьшенный (мортирная)", "cmdLabel": "Уменьшенный", "rows": [[8400, 0, 1158, 20, 20, 79], [8600, 0, 1148, 20, 21, 76], [8800, 0, 1138, 20, 22, 72], [9000, 0, 1128, 20, 23, 69], [9200, 0, 1118, 19, 23, 66], [9400, 0, 1107, 19, 24, 63], [9600, 0, 1096, 18, 24, 60], [9800, 0, 1084, 18, 24, 58], [10000, 0, 1072, 17, 25, 56], [10200, 0, 1060, 16, 25, 54], [10400, 0, 1048, 16, 26, 52], [10600, 0, 1035, 15, 26, 50], [10800, 0, 1021, 15, 26, 47], [11000, 0, 1007, 14, 27, 45], [11200, 0, 993, 14, 27, 42], [11400, 0, 977, 13, 27, 40], [11600, 0, 960, 12, 27, 37], [11800, 0, 941, 11, 28, 35], [12000, 0, 921, 10, 28, 33], [12200, 0, 898, 9, 28, 30], [12400, 0, 871, 7, 29, 28], [12600, 0, 837, 6, 29, 25]]}, "1": {"label": "1-й (мортирная)", "cmdLabel": "1", "rows": [[7600, 0, 1157, 17, 20, 75], [7800, 0, 1146, 17, 20, 72], [8000, 0, 1135, 17, 21, 69], [8200, 0, 1123, 17, 21, 66], [8400, 0, 1112, 17, 22, 63], [8600, 0, 1100, 16, 22, 60], [8800, 0, 1088, 16, 23, 57], [9000, 0, 1075, 15, 23, 53], [9200, 0, 1061, 15, 24, 51], [9400, 0, 1047, 14, 24, 49], [9600, 0, 1033, 13, 25, 46], [9800, 0, 1018, 12, 25, 44], [10000, 0, 1002, 12, 26, 41], [10200, 0, 984, 11, 27, 38], [10400, 0, 966, 11, 27, 36], [10600, 0, 945, 10, 27, 34], [10800, 0, 923, 9, 27, 32], [11000, 0, 897, 8, 27, 30], [11200, 0, 866, 6, 28, 27], [11400, 0, 823, 5, 28, 24]]}, "2": {"label": "2-й (мортирная)", "cmdLabel": "2", "rows": [[6600, 0, 1160, 16, 17, 74], [6800, 0, 1148, 16, 18, 70], [7000, 0, 1135, 16, 18, 66], [7200, 0, 1122, 15, 19, 62], [7400, 0, 1108, 15, 20, 59], [7600, 0, 1094, 14, 20, 56], [7800, 0, 1079, 14, 21, 53], [8000, 0, 1064, 13, 21, 50], [8200, 0, 1049, 13, 22, 47], [8400, 0, 1032, 12, 23, 44], [8600, 0, 1014, 12, 23, 41], [8800, 0, 996, 11, 24, 39], [9000, 0, 975, 10, 24, 37], [9200, 0, 953, 9, 25, 35], [9400, 0, 928, 8, 25, 33], [9600, 0, 898, 7, 25, 31], [9800, 0, 860, 6, 26, 29], [10000, 0, 803, 4, 26, 27]]}, "3": {"label": "3-й (мортирная)", "cmdLabel": "3", "rows": [[5400, 0, 1161, 13, 50, 63], [5600, 0, 1145, 13, 53, 59], [5800, 0, 1129, 12, 56, 56], [6000, 0, 1113, 12, 58, 53], [6200, 0, 1096, 12, 60, 50], [6400, 0, 1078, 11, 61, 48], [6600, 0, 1060, 11, 62, 45], [6800, 0, 1040, 10, 63, 43], [7000, 0, 1020, 10, 64, 40], [7200, 0, 997, 9, 65, 37], [7400, 0, 973, 8, 66, 35], [7600, 0, 946, 7, 67, 32], [7800, 0, 915, 7, 68, 29], [8000, 0, 878, 5, 68, 27], [8200, 0, 827, 4, 67, 24]]}, "4": {"label": "4-й (мортирная)", "cmdLabel": "4", "rows": [[4200, 0, 1154, 10, 31, 59], [4400, 0, 1133, 10, 33, 55], [4600, 0, 1111, 9, 34, 51], [4800, 0, 1088, 9, 36, 47], [5000, 0, 1063, 8, 37, 44], [5200, 0, 1037, 8, 39, 41], [5400, 0, 1009, 7, 40, 38], [5600, 0, 979, 6, 40, 34], [5800, 0, 944, 6, 40, 30], [6000, 0, 900, 5, 41, 27], [6200, 0, 841, 3, 41, 24]]}};
  const RIK_LIMITS_D30 = { full: 8600, reduced: 7400, "1": 6600, "2": 6000, "3": 5400, "4": 4200 };

  const TS_2B11 = {"1": {"label": "1-й (400–1400 м)", "cmdLabel": "1", "rows": [[400, 417, 417, 12, 4, 0], [500, 425, 425, 3, 4, 0], [600, 462, 462, 3, 4, 0], [700, 500, 500, 2, 4, 0], [800, 540, 540, 2, 5, 0], [900, 582, 582, 2, 5, 0], [1000, 627, 627, 2, 5, 0], [1100, 678, 678, 2, 6, 0], [1200, 737, 737, 1, 6, 0], [1300, 810, 810, 1, 6, 0], [1400, 927, 927, 1, 7, 0]]}, "2": {"label": "2-й (800–2500 м)", "cmdLabel": "2", "rows": [[800, 417, 417, 7, 6, 0], [900, 431, 431, 5, 6, 0], [1000, 453, 453, 5, 7, 0], [1100, 475, 475, 5, 7, 0], [1200, 497, 497, 4, 7, 0], [1300, 520, 520, 4, 7, 0], [1400, 544, 544, 4, 8, 0], [1500, 568, 568, 4, 8, 0], [1600, 594, 594, 4, 8, 0], [1700, 621, 621, 4, 9, 0], [1800, 649, 649, 3, 9, 0], [1900, 679, 679, 3, 9, 0], [2000, 712, 712, 3, 10, 0], [2100, 749, 749, 2, 10, 0], [2200, 791, 791, 2, 10, 0], [2300, 842, 842, 1, 11, 0], [2400, 917, 917, 1, 11, 0], [2500, 1000, 1000, 1, 12, 0]]}, "3": {"label": "3-й (1100–3400 м)", "cmdLabel": "3", "rows": [[1100, 417, 417, 11, 8, 0], [1200, 426, 426, 7, 8, 0], [1300, 441, 441, 6, 9, 0], [1400, 457, 457, 6, 9, 0], [1500, 473, 473, 6, 9, 0], [1600, 489, 489, 6, 10, 0], [1700, 505, 505, 6, 10, 0], [1800, 522, 522, 6, 10, 0], [1900, 539, 539, 6, 10, 0], [2000, 557, 557, 6, 11, 0], [2100, 575, 575, 5, 11, 0], [2200, 594, 594, 5, 11, 0], [2300, 614, 614, 5, 12, 0], [2400, 634, 634, 5, 12, 0], [2500, 655, 655, 5, 12, 0], [2600, 677, 677, 4, 13, 0], [2700, 701, 701, 4, 13, 0], [2800, 727, 727, 4, 13, 0], [2900, 754, 754, 3, 14, 0], [3000, 785, 785, 3, 14, 0], [3100, 821, 821, 2, 14, 0], [3200, 864, 864, 2, 15, 0], [3300, 925, 925, 1, 15, 0], [3400, 1000, 1000, 1, 15, 0]]}, "4": {"label": "4-й (1400–4300 м)", "cmdLabel": "4", "rows": [[1400, 417, 417, 20, 10, 0], [1500, 422, 422, 8, 10, 0], [1600, 434, 434, 8, 11, 0], [1700, 446, 446, 8, 11, 0], [1800, 459, 459, 8, 11, 0], [1900, 471, 471, 8, 11, 0], [2000, 484, 484, 8, 12, 0], [2100, 497, 497, 8, 12, 0], [2200, 510, 510, 8, 12, 0], [2300, 523, 523, 8, 12, 0], [2400, 536, 536, 7, 13, 0], [2500, 550, 550, 7, 13, 0], [2600, 564, 564, 7, 13, 0], [2700, 578, 578, 7, 14, 0], [2800, 593, 593, 6, 14, 0], [2900, 609, 609, 7, 14, 0], [3000, 624, 624, 6, 15, 0], [3100, 640, 640, 6, 15, 0], [3200, 657, 657, 6, 15, 0], [3300, 675, 675, 6, 16, 0], [3400, 693, 693, 5, 16, 0], [3500, 713, 713, 5, 16, 0], [3600, 733, 733, 5, 17, 0], [3700, 755, 755, 4, 17, 0], [3800, 779, 779, 4, 17, 0], [3900, 806, 806, 3, 18, 0], [4000, 836, 836, 3, 18, 0], [4100, 871, 871, 2, 18, 0], [4200, 921, 921, 1, 19, 0], [4300, 1000, 1000, 1, 19, 0]]}, "5": {"label": "5-й (1700–5200 м)", "cmdLabel": "5", "rows": [[1700, 417, 417, 17, 12, 0], [1800, 423, 423, 10, 12, 0], [1900, 433, 433, 10, 12, 0], [2000, 443, 443, 9, 13, 0], [2100, 454, 454, 10, 13, 0], [2200, 464, 464, 9, 13, 0], [2300, 475, 475, 10, 14, 0], [2400, 485, 485, 9, 14, 0], [2500, 496, 496, 9, 14, 0], [2600, 507, 507, 9, 14, 0], [2700, 518, 518, 9, 15, 0], [2800, 529, 529, 9, 15, 0], [2900, 540, 540, 8, 15, 0], [3000, 552, 552, 8, 16, 0], [3100, 564, 564, 8, 16, 0], [3200, 576, 576, 8, 16, 0], [3300, 588, 588, 8, 16, 0], [3400, 601, 601, 8, 17, 0], [3500, 614, 614, 8, 17, 0], [3600, 627, 627, 7, 17, 0], [3700, 641, 641, 7, 18, 0], [3800, 655, 655, 7, 18, 0], [3900, 669, 669, 7, 18, 0], [4000, 684, 684, 6, 18, 0], [4100, 700, 700, 6, 19, 0], [4200, 717, 717, 6, 19, 0], [4300, 734, 734, 5, 19, 0], [4400, 753, 753, 5, 20, 0], [4500, 773, 773, 5, 20, 0], [4600, 794, 794, 4, 20, 0], [4700, 817, 817, 4, 21, 0], [4800, 843, 843, 3, 21, 0], [4900, 874, 874, 3, 21, 0], [5000, 913, 913, 2, 22, 0], [5100, 976, 976, 1, 22, 0], [5200, 1000, 1000, 1, 22, 0]]}, "6": {"label": "6-й (2000–6000 м)", "cmdLabel": "6", "rows": [[2000, 417, 417, 12, 14, 0], [2100, 425, 425, 11, 14, 0], [2200, 434, 434, 11, 14, 0], [2300, 443, 443, 11, 15, 0], [2400, 452, 452, 11, 15, 0], [2500, 461, 461, 11, 15, 0], [2600, 470, 470, 11, 15, 0], [2700, 479, 479, 11, 16, 0], [2800, 488, 488, 10, 16, 0], [2900, 498, 498, 11, 16, 0], [3000, 507, 507, 11, 16, 0], [3100, 516, 516, 10, 16, 0], [3200, 526, 526, 10, 17, 0], [3300, 536, 536, 10, 17, 0], [3400, 546, 546, 10, 17, 0], [3500, 556, 556, 10, 18, 0], [3600, 566, 566, 9, 18, 0], [3700, 577, 577, 10, 18, 0], [3800, 587, 587, 9, 18, 0], [3900, 598, 598, 9, 19, 0], [4000, 609, 609, 9, 19, 0], [4100, 620, 620, 8, 19, 0], [4200, 632, 632, 8, 20, 0], [4300, 644, 644, 8, 20, 0], [4400, 656, 656, 8, 20, 0], [4500, 669, 669, 8, 20, 0], [4600, 682, 682, 8, 21, 0], [4700, 695, 695, 7, 21, 0], [4800, 709, 709, 7, 21, 0], [4900, 724, 724, 7, 22, 0], [5000, 739, 739, 6, 22, 0], [5100, 755, 755, 6, 22, 0], [5200, 773, 773, 6, 23, 0], [5300, 791, 791, 5, 23, 0], [5400, 811, 811, 5, 23, 0], [5500, 833, 833, 4, 24, 0], [5600, 857, 857, 3, 24, 0], [5700, 886, 886, 3, 24, 0], [5800, 922, 922, 2, 23, 0], [5900, 978, 978, 1, 25, 0], [6000, 1000, 1000, 1, 25, 0]]}, "long": {"label": "Дальнобойный (2400–7300 м)", "cmdLabel": "Дальнобойный", "rows": [[2400, 417, 417, 20, 16, 0], [2500, 422, 422, 14, 16, 0], [2600, 429, 429, 14, 16, 0], [2700, 436, 436, 14, 16, 0], [2800, 443, 443, 14, 16, 0], [2900, 450, 450, 14, 16, 0], [3000, 457, 457, 12, 17, 0], [3100, 465, 465, 14, 17, 0], [3200, 472, 472, 14, 17, 0], [3300, 479, 479, 12, 17, 0], [3400, 487, 487, 14, 17, 0], [3500, 494, 494, 12, 17, 0], [3600, 502, 502, 14, 18, 0], [3700, 509, 509, 12, 18, 0], [3800, 517, 517, 12, 18, 0], [3900, 525, 525, 12, 18, 0], [4000, 533, 533, 14, 18, 0], [4100, 540, 540, 12, 18, 0], [4200, 548, 548, 11, 18, 0], [4300, 557, 557, 12, 19, 0], [4400, 565, 565, 12, 19, 0], [4500, 573, 573, 11, 19, 0], [4600, 582, 582, 12, 19, 0], [4700, 590, 590, 11, 19, 0], [4800, 599, 599, 11, 20, 0], [4900, 608, 608, 11, 20, 0], [5000, 617, 617, 11, 20, 0], [5100, 626, 626, 10, 20, 0], [5200, 636, 636, 11, 20, 0], [5300, 645, 645, 10, 20, 0], [5400, 655, 655, 9, 20, 0], [5500, 666, 666, 10, 21, 0], [5600, 676, 676, 9, 21, 0], [5700, 687, 687, 9, 21, 0], [5800, 698, 698, 8, 21, 0], [5900, 710, 710, 8, 22, 0], [6000, 722, 722, 8, 22, 0], [6100, 734, 734, 8, 22, 0], [6200, 747, 747, 7, 22, 0], [6300, 761, 761, 7, 22, 0], [6400, 776, 776, 7, 22, 0], [6500, 791, 791, 6, 23, 0], [6600, 808, 808, 6, 23, 0], [6700, 826, 826, 5, 23, 0], [6800, 846, 846, 4, 23, 0], [6900, 869, 869, 4, 23, 0], [7000, 896, 896, 3, 23, 0], [7100, 930, 930, 1, 23, 0], [7200, 997, 997, 1, 23, 0], [7300, 1000, 1000, 1, 23, 0]]}};

  function lookupTs(sysKey, chargeKey, dist, d30Mode) {
    const isMort = sysKey !== "2b11" && d30Mode === "mort";
    const src = sysKey === "2b11" ? TS_2B11 : (isMort ? TS_D30_MORT : TS_D30);
    const defKey = sysKey === "2b11" ? "3" : "2";
    const tsTitle = sysKey === "2b11" ? "ТС 2Б11" : (isMort ? "ТС №145 (мортир.)" : (d30Mode === "rik" ? "ТС №145 (рикошет)" : "ТС №145"));
    const tbl = src[chargeKey] || src[defKey];
    const rows = tbl.rows;
    const minD = rows[0][0];
    const maxD = rows[rows.length - 1][0];

    if (dist <= minD) {
      const r0 = rows[0];
      const noScale = isMort || sysKey === "2b11";
      const ratio = (!noScale && minD > 0) ? dist / minD : 1;
      return {
        label: tbl.label,
        cmdLabel: tbl.cmdLabel,
        prDel: Math.round(r0[1] * ratio),
        prTys: Math.round(r0[2] * ratio),
        dxTys: r0[3],
        vd: r0[4],
        z: Math.round(r0[5] * ratio),
        status: dist < minD
          ? (noScale ? ("Ниже мин. ТС (" + minD + " м) — смените заряд!") : ("Ниже мин. ТС (" + minD + " м), экстраполяция"))
          : ("По " + tsTitle)
      };
    }

    if (dist >= maxD) {
      const rl = rows[rows.length - 1];
      return {
        label: tbl.label,
        cmdLabel: tbl.cmdLabel,
        prDel: rl[1],
        prTys: rl[2],
        dxTys: rl[3],
        vd: rl[4],
        z: rl[5],
        status: dist > maxD ? "Выше макс. ТС (" + maxD + " м) — смените заряд!" : "По " + tsTitle
      };
    }

    for (let i = 0; i < rows.length - 1; i++) {
      const a = rows[i];
      const b = rows[i + 1];
      if (dist >= a[0] && dist <= b[0]) {
        const t = (dist - a[0]) / (b[0] - a[0]);
        return {
          label: tbl.label,
          cmdLabel: tbl.cmdLabel,
          prDel: Math.round(a[1] + t * (b[1] - a[1])),
          prTys: Math.round(a[2] + t * (b[2] - a[2])),
          dxTys: Math.round(a[3] + t * (b[3] - a[3])),
          vd: Math.round(a[4] + t * (b[4] - a[4])),
          z: Math.round(a[5] + t * (b[5] - a[5])),
          status: "По " + tsTitle + " (интерполяция)"
        };
      }
    }
    return null;
  }

  const state = {
    inputs: {
      systemKey: "d30",
      systemName: "122-мм Г Д-30",
      charge: "2",
      d30Mode: "nast",
      fuzeMode: "impact",
      trStart: "",
      hOpt: 15,
      dxTys: 19,
      guns: 4,
      callKnp: "Кама",
      callOp: "Вишня",
      callCmd: "Дон",
      knpX: 95916,
      knpY: 39161,
      knpH: 95,
      opX: 95365,
      opY: 42173,
      opH: 125,
      targetInputMode: "polar",
      targetX: null,
      targetY: null,
      targetH: null,
      goalNum: "103",
      goalType: "пехота на занятой позиции",
      taskType: "Подавить",
      dk: 2660,
      ak: 3398,
      on: 4100,
      baseUglom: null,
      mk: 0,
      fcRaw: "0-40",
      gc: 120,
      fb: 70,
      ddCis: -122,
      ddeltaCis: 27,
      startPr: 0,
      useDeriv: false
    },
    calc: null,
    tsData: null,
    rows: [],
    currentPr: 174,
    currentUr: 3000,
    currentNapr: 0,
    totalRashod: 0,
    burstMode: "burst",
    prkModel: "69",
    prkManual: false,
    prkAngle: 0,
    prkAngleRight: 0,
    prkActiveCircle: "left",
    prkRulerX: 0,
    prkTool: "point",
    prkMarks: [],
    lastBurst: null,
    seenPlus: false,
    seenMinus: false,
    readyForEffect: false,
    forkAlreadyHalved: false,
    ffeActive: false,
    burstTapCount: 0,
    burstTapTimer: null,
    learnTool: "calc",
    activeTab: "calc",
    theoryCat: "all",
    theoryQuery: "",
    appMode: "d30",
    genHistory: [],
    genCorrMode: "pnzr",
    genD30FireMode: "random",
    activeScenario: null,
    currentGenItem: null,
    genConditionCollapsed: false,
    batchVariants: []
  };

  function $(id) {
    return document.getElementById(id);
  }

  function parseMils(str) {
    if (typeof str === "number") return Math.round(str);
    const cleaned = String(str || "0").trim().replace(",", ".");
    if (!cleaned) return 0;
    const sign = cleaned.startsWith("-") ? -1 : 1;
    const body = cleaned.replace(/^[+-]/, "");
    if (body.includes("-")) {
      const parts = body.split("-");
      const big = parseInt(parts[0] || "0", 10) || 0;
      const small = parseInt(parts[1] || "0", 10) || 0;
      return sign * (big * 100 + small);
    }
    const num = parseFloat(body);
    return Number.isFinite(num) ? sign * Math.round(num) : 0;
  }

  function fmtMils(val, signed) {
    const v = Math.round(val);
    const abs = Math.abs(v);
    const big = Math.floor(abs / 100);
    const small = abs % 100;
    const s = String(big) + "-" + String(small).padStart(2, "0");
    if (signed) {
      if (v > 0) return "+" + s;
      if (v < 0) return "-" + s;
      return "0-00";
    }
    return String(big).padStart(2, "0") + "-" + String(small).padStart(2, "0");
  }

  function norm6000(mils) {
    let m = Math.round(mils) % 6000;
    if (m < 0) m += 6000;
    return m;
  }

  function normDelta(mils) {
    let m = Math.round(mils) % 6000;
    if (m > 3000) m -= 6000;
    if (m < -3000) m += 6000;
    return m;
  }

  function milsToRad(mils) {
    return (mils * 2 * Math.PI) / 6000;
  }

  function radToMils(rad) {
    return norm6000((rad * 6000) / (2 * Math.PI));
  }

  function showToast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(function () {
      t.classList.remove("show");
    }, 2400);
  }


  function getWorkKey() {
    return WORK_STORAGE_KEY + "_" + state.appMode;
  }

  function getGenKey() {
    return GEN_STORAGE_KEY + "_" + state.appMode;
  }

  function isMortarMode() {
    return state.appMode === "2b11" || state.inputs.systemKey === "2b11";
  }

  function syncChargeOptions(is2b11) {
    const inOpts = is2b11
      ? [
          ["1", "1-й (400–1400 м)"],
          ["2", "2-й (800–2500 м)"],
          ["3", "3-й (1100–3400 м)"],
          ["4", "4-й (1400–4300 м)"],
          ["5", "5-й (1700–5200 м)"],
          ["6", "6-й (2000–6000 м)"],
          ["long", "Дальнобойный (2400–7300 м)"]
        ]
      : [
          ["full", "Полный (V₀ 690)"],
          ["reduced", "Уменьшенный (V₀ 565)"],
          ["1", "1-й (V₀ 493)"],
          ["2", "2-й (V₀ 417)"],
          ["3", "3-й (V₀ 335)"],
          ["4", "4-й (V₀ 276)"]
        ];
    const cmdOpts = is2b11
      ? [
          ["1", "1-й"], ["2", "2-й"], ["3", "3-й"], ["4", "4-й"],
          ["5", "5-й"], ["6", "6-й"], ["long", "Дальнобойный"]
        ]
      : [
          ["full", "Полный"], ["reduced", "Уменьшенный"],
          ["1", "1-й"], ["2", "2-й"], ["3", "3-й"], ["4", "4-й"]
        ];
    const defVal = is2b11 ? "4" : "2";
    [["inCharge", inOpts], ["cmd1Charge", cmdOpts]].forEach(function (pair) {
      const sel = $(pair[0]);
      if (!sel) return;
      const prev = sel.value;
      sel.innerHTML = pair[1].map(function (o) {
        return '<option value="' + o[0] + '">' + o[1] + '</option>';
      }).join("");
      const exists = pair[1].some(function (o) { return o[0] === prev; });
      sel.value = exists ? prev : defVal;
    });
  }

  function applyThemeForMode(mode) {
    const is2b11 = mode === "2b11";
    const isTheory = mode === "theory";
    document.body.classList.toggle("theme-2b11", is2b11);
    document.body.classList.toggle("theme-theory", isTheory);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute("content", isTheory ? "#101517" : (is2b11 ? "#131011" : "#0f1410"));
    }
    document.querySelectorAll("#topSystemSwitch .sys-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-sys-mode") === mode);
    });
    if ($("genTitle")) {
      $("genTitle").textContent = is2b11 ? "Генератор задач СОБ (2Б11)" : "Генератор задач СОБ (Д-30)";
    }
    if ($("tsCardTitle")) {
      $("tsCardTitle").textContent = is2b11 ? "Таблицы стрельбы 2Б11 (2С12, ОФ-843Б)" : "Таблицы стрельбы Д-30 (ТС №145, ОФ-462Ж)";
    }
    if ($("genD30FireModeRow")) {
      $("genD30FireModeRow").classList.toggle("hidden", is2b11);
    }
    if ($("inD30ModeField")) {
      $("inD30ModeField").classList.toggle("hidden", is2b11);
    }
    if (!isTheory) {
      syncChargeOptions(is2b11);
    }
  }

  function switchAppSystem(mode) {
    if (mode !== "d30" && mode !== "2b11" && mode !== "theory") return;
    if (mode === "theory") {
      applyThemeForMode("theory");
      renderTheoryPanel();
      switchTab("theory");
      return;
    }
    if (state.activeTab === "theory") {
      switchTab("calc");
    }
    if (state.appMode === mode && !document.body.classList.contains("theme-theory")) return;
    saveWorkState();
    state.burstTapCount = 0;
    clearTimeout(state.burstTapTimer);
    if ($("btnOpenBurst")) $("btnOpenBurst").textContent = "Разрыв / Корректура";
    state.appMode = mode;
    try { localStorage.setItem(MODE_STORAGE_KEY, mode); } catch (e) {}
    applyThemeForMode(mode);

    loadGenHistory();
    const loaded = loadWorkState();
    if (!loaded) {
      state.rows = [];
      state.totalRashod = 0;
      state.seenPlus = false;
      state.seenMinus = false;
      state.readyForEffect = false;
      state.forkAlreadyHalved = false;
      state.ffeActive = false;
      state.lastBurst = null;
      state.activeScenario = null;
      state.currentGenItem = null;
      $("inSystem").value = mode === "2b11" ? "2b11" : "d30";
      $("inCharge").value = mode === "2b11" ? "4" : "2";
      $("inUseDeriv").checked = mode !== "2b11";
      renderScenarioViews();
      $("genTaskPreviewCard").classList.add("hidden");
      $("genSolutionCard").classList.add("hidden");
      readSetupInputs();
      computeAll();
    } else {
      $("genTaskPreviewCard").classList.add("hidden");
      $("genSolutionCard").classList.add("hidden");
    }
    renderTable();
    renderPrkPanel();
    renderLearnPanel();
    renderTheoryPanel();
    showToast(mode === "2b11" ? "Режим: 120-мм миномёт 2Б11" : "Режим: 122-мм гаубица Д-30");
  }

  function clearCalcUI() {
    state.calc = null;
    state.tsData = null;
    ["outKnp", "outOp", "outTargetXY", "outDct", "outAct", "outDeltact", "outDi", "outDeltai",
     "outUrPr", "outKu", "outPs", "outShu", "outSk", "outIv", "prkPs", "prkOpSide", "prkDists", "prkKuShu"].forEach(function (id) {
      $(id).textContent = "—";
    });
    $("headerTaskSummary").textContent = "Введите исходные данные";
    $("outOpSidePill").textContent = "ОП: —";
    $("tsCard").classList.add("hidden");
    $("cmd1Preview").value = "";
  }

  function computeAll() {
    const inp = state.inputs;
    const isRect = inp.targetInputMode === "rect";
    if (isRect) {
      if (inp.opX === null || inp.opY === null || inp.targetX === null || inp.targetY === null) {
        clearCalcUI();
        return;
      }
    } else {
      if (inp.knpX === null || inp.knpY === null || inp.opX === null || inp.opY === null || inp.dk === null || inp.ak === null) {
        clearCalcUI();
        return;
      }
    }
    const knpH = inp.knpH !== null ? inp.knpH : 0;
    const opH = inp.opH !== null ? inp.opH : 0;
    const onVal = inp.on !== null ? inp.on : 0;

    let xt, yt, ht;
    if (isRect) {
      xt = inp.targetX;
      yt = inp.targetY;
      ht = inp.targetH !== null ? Math.round(inp.targetH) : opH;
      if (inp.knpX !== null && inp.knpY !== null) {
        inp.dk = Math.round(Math.hypot(xt - inp.knpX, yt - inp.knpY));
        inp.ak = radToMils(Math.atan2(yt - inp.knpY, xt - inp.knpX));
      } else {
        inp.dk = 0;
        inp.ak = 0;
      }
    } else {
      const akRad = milsToRad(inp.ak);
      xt = inp.knpX + inp.dk * Math.cos(akRad);
      yt = inp.knpY + inp.dk * Math.sin(akRad);
      ht = Math.round(knpH + 0.001 * inp.dk * (inp.mk || 0));
    }

    const dx = xt - inp.opX;
    const dy = yt - inp.opY;
    const dct = Math.hypot(dx, dy);
    const act = radToMils(Math.atan2(dy, dx));
    const deltact = normDelta(act - onVal);

    const di = Math.round(dct + inp.ddCis);

    let tsData = null;
    const hasTs = inp.systemKey === "d30" || inp.systemKey === "2s1" || inp.systemKey === "2b11";
    if (hasTs) {
      tsData = lookupTs(inp.systemKey, inp.charge, di, inp.d30Mode);
      if (tsData && inp.systemKey !== "2b11" && inp.d30Mode === "rik") {
        const rikMax = RIK_LIMITS_D30[inp.charge] || 8600;
        if (di > rikMax) tsData.status = "Вне предела рикошета P-P (> " + rikMax + " м)!";
      }
      if (tsData) {
        inp.dxTys = tsData.dxTys;
        $("inDxTys").value = tsData.dxTys;
      }
    }
    state.tsData = tsData;

    const derivCorr = inp.useDeriv && tsData ? -tsData.z : 0;
    const deltai = normDelta(deltact + inp.ddeltaCis + derivCorr);

    const hasHeight = isRect ? (inp.targetH !== null && inp.opH !== null) : (inp.knpH !== null && inp.opH !== null);
    const dh = hasHeight ? (ht - inp.opH) : 0;
    const urOffset = dct > 0 ? Math.round(dh / (0.001 * dct)) : 0;
    const ur = 3000 + urOffset;

    const effectivePr = inp.startPr > 0 ? inp.startPr : (tsData ? tsData.prTys : 0);

    const hasKnp = inp.knpX !== null && inp.knpY !== null;
    const kuRaw = (dct > 0 && hasKnp) ? inp.dk / dct : 0;
    const ku = Math.round(kuRaw * 10) / 10;

    const ps = hasKnp ? normDelta(inp.ak - act) : 0;
    const opSide = !hasKnp ? "КНП не задан" : (ps >= 0 ? "ОП справа" : "ОП слева");
    const shu = (dct > 0 && hasKnp) ? Math.round(Math.abs(ps) / (0.01 * dct)) : 0;

    let fcMeters = 0;
    const fcStr = String(inp.fcRaw || "0").trim();
    if (fcStr.includes("-")) {
      const fcMils = parseMils(fcStr);
      fcMeters = Math.round(fcMils * 0.001 * inp.dk);
    } else {
      fcMeters = parseFloat(fcStr) || 0;
    }

    const skMeters = inp.gc !== null ? Math.round(inp.gc / 3) : 0;
    const skTys = inp.dxTys > 0 ? Math.round(skMeters / inp.dxTys) : 0;

    const gunsCount = Math.max(1, inp.guns);
    const denomIv = 0.001 * dct * gunsCount;
    const stepFrontM = fcMeters / gunsCount;
    const useTwoUglom = fcMeters > 50 && stepFrontM > 50;
    const frontForIv = useTwoUglom ? (fcMeters / 2) : fcMeters;
    const iv = fcMeters <= 50 ? 0 : (denomIv > 0 ? Math.max(0, Math.round((frontForIv - inp.fb) / denomIv)) : 0);
    const uglomShift = useTwoUglom && dct > 0 ? Math.max(1, Math.round((fcMeters / 4) / (0.001 * dct))) : 0;

    state.calc = {
      xt: Math.round(xt),
      yt: Math.round(yt),
      ht: ht,
      dct: Math.round(dct),
      act: act,
      actRad: milsToRad(act),
      deltact: deltact,
      di: di,
      deltai: deltai,
      ur: ur,
      effectivePr: effectivePr,
      ku: ku,
      ps: ps,
      opSide: opSide,
      shu: shu,
      fcMeters: fcMeters,
      skMeters: skMeters,
      skTys: skTys,
      iv: iv,
      useTwoUglom: useTwoUglom,
      uglomShift: uglomShift,
      hOpt: inp.fuzeMode === "rv" ? 10 : (inp.hOpt || 15),
      mOpt: dct > 0 ? Math.max(1, Math.round((inp.fuzeMode === "rv" ? 10 : (inp.hOpt || 15)) / (0.001 * dct))) : 0,
      mPerMil: dct > 0 ? (0.001 * dct).toFixed(1) : "0"
    };

    if ($("bExactPs")) $("bExactPs").checked = Math.abs(ps) >= 500;
    if (!state.prkManual && state.calc) { state.prkAngle = state.calc.ps; state.prkAngleRight = Math.round(state.calc.ps * 0.6); state.prkRulerX = 0; }
    renderCalcPanel();
    renderPrkPanel();
    renderLearnPanel();
    updateCmd1Preview();
  }

  function renderCalcPanel() {
    const inp = state.inputs;
    const c = state.calc;
    const ts = state.tsData;
    if (!c) return;

    $("headerTaskSummary").textContent =
      inp.systemName + " • Цель " + inp.goalNum + " • " + inp.callKnp + " / " + inp.callOp;
    $("outKnp").textContent = (inp.knpX !== null ? inp.knpX : "—") + " / " + (inp.knpY !== null ? inp.knpY : "—") + " / " + (inp.knpH !== null ? inp.knpH : "—");
    $("outOp").textContent = inp.opX + " / " + inp.opY + " / " + (inp.opH !== null ? inp.opH : "—");
    $("outTargetXY").textContent = c.xt + " / " + c.yt + " / " + c.ht;
    $("outDct").textContent = c.dct + " м";
    $("outAct").textContent = fmtMils(c.act, false);
    $("outDeltact").textContent = fmtMils(c.deltact, true);

    $("outDi").textContent = c.di + " м";
    $("outDeltai").textContent = fmtMils(c.deltai, true);
    $("outUrPr").textContent = fmtMils(c.ur, false) + " / " + c.effectivePr;
    $("outKu").textContent = c.ku.toFixed(1);
    $("outPs").textContent = fmtMils(c.ps, true) + " (" + fmtMils(Math.abs(c.ps), false) + ")";
    $("outShu").textContent = fmtMils(c.shu, false);
    $("outSk").textContent = inp.gc !== null ? (c.skMeters + " м (" + c.skTys + " тыс.)") : "—";
    $("outIv").textContent = fmtMils(c.iv, false);
    $("outOpSidePill").textContent = c.opSide;

    if ($("fuzeCalcCard")) {
      const isDt = inp.fuzeMode === "dt";
      const isRv = inp.fuzeMode === "rv";
      $("fuzeCalcCard").classList.toggle("hidden", !isDt && !isRv);
      if (isDt || isRv) {
        $("fuzeModePill").textContent = isDt ? "ДТ (воздушный)" : "РВ (автономный)";
        $("fuzeTypeVal").textContent = isDt ? "Дистанционная трубка (Т-90 / ДТМ)" : "Радиовзрыватель (АР-30, кран «В»)";
        $("fuzeHoptVal").textContent = c.hOpt + " м (" + fmtMils(c.mOpt, false) + " тыс.)";
        $("fuzeUrCorrVal").textContent = isDt
          ? ("Ур +" + fmtMils(c.mOpt, false) + " → " + fmtMils(c.ur + c.mOpt, false) + (inp.trStart ? " | Тр " + inp.trStart : " | Тр по ТС"))
          : "Трубка не нужна (при «О»→«В»: Пр +1…+2 тыс.)";
        $("fuzeNoteVal").textContent = isDt
          ? ("0-01 Ур = " + c.mPerMil + " м высоты | Удар → Ур +0-04")
          : "Высота 5–15 м авто | Не применять на рикошет и в лесу";
      }
    }

    if (ts) {
      $("tsCard").classList.remove("hidden");
      $("tsStatusPill").textContent = ts.status;
      $("tsChargeDist").textContent = ts.label + " • " + c.di + " м";
      $("tsPr").textContent = ts.prTys + " тыс. (" + ts.prDel + " дел.)";
      $("tsDxTys").textContent = ts.dxTys + " м";
      $("tsVd").textContent = ts.vd + " м / УВ " + (ts.vd * 4) + " / ШВ " + (ts.vd * 8);
      $("tsZ").textContent = "-" + fmtMils(ts.z, false) + (inp.useDeriv ? " (вкл)" : "");
    } else {
      $("tsCard").classList.add("hidden");
    }

    const akDeg = (inp.ak * 0.06).toFixed(2);
    const knpH = inp.knpH !== null ? inp.knpH : 0;
    const opH = inp.opH !== null ? inp.opH : 0;
    const dxT = c.xt - inp.opX;
    const dyT = c.yt - inp.opY;
    const onVal = inp.on !== null ? inp.on : 0;

    const formulas = {
      f_outTargetXY: inp.targetInputMode === "rect"
        ? ("Заданы напрямую: Xц = " + c.xt + ", Yц = " + c.yt + ", hц = " + c.ht + " м" + (inp.knpX !== null ? ("<br>От КНП: Дк = " + inp.dk + " м, αк = " + fmtMils(inp.ak, false)) : ""))
        : ("Xц = Xкнп + Дк·cos(αк) = " + inp.knpX + " + " + inp.dk + "·cos(" + akDeg + "°) = " + c.xt +
          "<br>Yц = Yкнп + Дк·sin(αк) = " + inp.knpY + " + " + inp.dk + "·sin(" + akDeg + "°) = " + c.yt +
          (inp.mk ? "<br>hц = hкнп + 0.001·Дк·Mк = " + c.ht + " м" : "")),
      f_outDct:
        "ΔX = " + c.xt + " − " + inp.opX + " = " + dxT + "; ΔY = " + c.yt + " − " + inp.opY + " = " + dyT +
        "<br>Дцт = √(ΔX² + ΔY²) = √(" + dxT + "² + " + dyT + "²) = " + c.dct + " м",
      f_outAct:
        "αцт = arctg(ΔY / ΔX) ÷ 0.06 = " + fmtMils(c.act, false),
      f_outDeltact:
        "δцт = αцт − ОН = " + fmtMils(c.act, false) + " − " + fmtMils(onVal, false) + " = " + fmtMils(c.deltact, true),
      f_outDi:
        "Ди = Дцт + ΔДцис = " + c.dct + " + (" + inp.ddCis + ") = " + c.di + " м",
      f_outDeltai:
        "δи = δцт + Δδиис" + (inp.useDeriv && ts ? " − Z" : "") + " = " + fmtMils(c.deltact, true) + " + (" + fmtMils(inp.ddeltaCis, true) + ")" + (inp.useDeriv && ts ? " − " + fmtMils(ts.z, false) : "") + " = " + fmtMils(c.deltai, true),
      f_outUrPr:
        "Ур = 30-00 + (hц − hоп) / (0.001·Дцт) = 30-00 + (" + c.ht + " − " + opH + ") / " + (0.001 * c.dct).toFixed(2) + " = " + fmtMils(c.ur, false) +
        "<br>Пр = " + c.effectivePr + (ts ? " (по " + (isMortarMode() ? "ТС 2Б11" : "ТС №145") + ")" : ""),
      f_outKu:
        "Ку = Дк / Дцт = " + inp.dk + " / " + c.dct + " = " + (inp.dk / c.dct).toFixed(2) + " ≈ " + c.ku.toFixed(1),
      f_outPs:
        "ПС = αк − αцт = " + fmtMils(inp.ak, false) + " − " + fmtMils(c.act, false) + " = " + fmtMils(c.ps, true) + " (" + c.opSide + ")",
      f_outShu:
        "Шу = |ПС| / (0.01·Дцт) = " + Math.abs(c.ps) + " / " + (0.01 * c.dct).toFixed(2) + " = " + c.shu + " → " + fmtMils(c.shu, false),
      f_outSk:
        inp.gc !== null ? ("Ск = 1/3·Гц = " + inp.gc + " / 3 = " + c.skMeters + " м (" + c.skMeters + " / " + inp.dxTys + " = " + c.skTys + " тыс.)") : "Гц не задана",
      f_outIv:
        "Iв = (Фц − Фб) / (0.001·Дцт·Nор) = (" + c.fcMeters + " − " + inp.fb + ") / (" + (0.001 * c.dct).toFixed(2) + "·" + inp.guns + ") = " + fmtMils(c.iv, false)
    };

    Object.keys(formulas).forEach(function (fid) {
      const el = $(fid);
      if (el) {
        el.innerHTML = formulas[fid];
        el.parentElement.classList.add("has-formula");
      }
    });

    $("cmd1Charge").value = inp.charge;
    $("cmd1Pr").value = c.effectivePr;
    $("tblGoalDesc").textContent = "Цель " + inp.goalNum + "-я, " + inp.goalType;
    $("tblF").textContent = c.fcMeters + " м";
    $("tblGl").textContent = inp.gc !== null ? (inp.gc + " м") : "—";
    $("tblKu").textContent = c.ku.toFixed(1);
    $("tblShu").textContent = fmtMils(c.shu, false);
    $("tblPs").textContent = fmtMils(Math.abs(c.ps), false);
  }

  function updateCmd1Preview() {
    const inp = state.inputs;
    const shell = $("cmd1Shell").value.trim() || "ОФ";
    let fuze = (!isMortarMode() && inp.d30Mode === "rik") ? "З" : ($("cmd1Fuze").value.trim() || "О");
    let trNote = "";
    if (inp.fuzeMode === "dt") {
      if (fuze === "О" || fuze === "З") fuze = "Т-90";
      trNote = inp.trStart ? (" Тр. " + inp.trStart + ".") : " Тр. (по ТС).";
    } else if (inp.fuzeMode === "rv") {
      if (fuze === "О" || fuze === "З") fuze = "АР-30 (В)";
    }
    const chargeKey = $("cmd1Charge").value;
    const tsDict = state.inputs.systemKey === "2b11" ? TS_2B11 : TS_D30;
    const chargeLabel = tsDict[chargeKey] ? tsDict[chargeKey].cmdLabel : chargeKey;
    const ammoWord = isMortarMode() ? "Мина" : "Сн.";
    const shotWord = isMortarMode() ? "мину" : "снаряд";
    const modeNote = (!isMortarMode() && inp.d30Mode === "mort") ? " Мортирная." : ((!isMortarMode() && inp.d30Mode === "rik") ? " На рикошет." : "");
    const text =
      "«" + inp.callKnp + "». Стой. Цель " + inp.goalNum + "-я, " +
      inp.goalType + ". " + inp.taskType + ". " + ammoWord + " «" + shell + "». Взр. «" +
      fuze + "»." + trNote + " Зар. " + chargeLabel + "." + modeNote + " Шк. Тыс. Основному 1 " + shotWord + ". Огонь.";
    $("cmd1Preview").value = text;
  }

  function renderTable() {
    const tbody = $("fireTableBody");
    $("tableCountBadge").textContent = String(state.rows.length);

    if (state.rows.length === 0) {
      tbody.innerHTML =
        '<tr class="empty-row"><td colspan="8">Таблица пуста. Сформируйте 1-ю команду во вкладке «Расчёт».</td></tr>';
      $("curPr").textContent = "—";
      $("curUr").textContent = "—";
      $("curNapr").textContent = "—";
      $("curRashod").textContent = "0";
      $("btnFireForEffect").classList.remove("ready-pulse");
      if ($("ffeStatusBar")) $("ffeStatusBar").classList.add("hidden");
      return;
    }

    tbody.innerHTML = state.rows
      .map(function (r, idx) {
        return (
          "<tr>" +
          "<td>" + r.num + "</td>" +
          "<td>" + escapeHtml(r.cmd) + "</td>" +
          "<td>" + escapeHtml(r.pr) + "</td>" +
          "<td>" + escapeHtml(r.ur) + "</td>" +
          "<td>" + escapeHtml(r.napr) + "</td>" +
          "<td>" + escapeHtml(r.obs) + "</td>" +
          "<td>" + escapeHtml(String(r.rashod)) + "</td>" +
          '<td><button class="btn-del-row" data-del-row="' + idx + '" type="button" title="Удалить строку">✕</button></td>' +
          "</tr>"
        );
      })
      .join("");

    tbody.querySelectorAll("[data-del-row]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const idx = parseInt(btn.getAttribute("data-del-row"), 10);
        deleteTableRow(idx);
      });
    });

    $("curPr").textContent = String(state.currentPr);
    $("curUr").textContent = fmtMils(state.currentUr, false);
    const uglomTxt = (state.inputs.baseUglom !== null)
      ? (" (Угл " + fmtMils(norm6000(state.inputs.baseUglom - state.currentNapr), false) + ")")
      : "";
    $("curNapr").textContent = fmtMils(state.currentNapr, true) + uglomTxt;
    $("curRashod").textContent = String(state.totalRashod);
    $("btnFireForEffect").classList.toggle("ready-pulse", !!state.readyForEffect);

    const ffeBar = $("ffeStatusBar");
    if (ffeBar) {
      if (state.ffeActive && state.calc) {
        const gcV = state.inputs.gc !== null ? state.inputs.gc : 100;
        const skT = state.calc.skTys || 0;
        const prText = gcV < 100
          ? ("1 уст.: Пр " + state.currentPr)
          : ("3 уст. (Ск " + skT + "): Пр " + (state.currentPr - skT) + " / " + state.currentPr + " / " + (state.currentPr + skT));
        const ivT = state.calc.fcMeters <= 50 ? "Сосредоточ." : (state.calc.iv > 0 ? ("Iв " + fmtMils(state.calc.iv, false)) : "Параллельн.");
        const ugT = state.calc.useTwoUglom ? ("Углом. 2 (±" + fmtMils(state.calc.uglomShift, false) + ")") : "Углом. 1";
        ffeBar.textContent = "Поражение: " + prText + " • " + ivT + " • " + ugT;
        ffeBar.classList.remove("hidden");
      } else {
        ffeBar.classList.add("hidden");
      }
    }
  }


  function deleteTableRow(idx) {
    if (idx < 0 || idx >= state.rows.length) return;
    state.rows.splice(idx, 1);

    if (state.rows.length === 0) {
      state.totalRashod = 0;
      state.lastBurst = null;
      state.seenPlus = false;
      state.seenMinus = false;
      state.readyForEffect = false;
      state.forkAlreadyHalved = false;
      state.ffeActive = false;
      state.burstTapCount = 0;
      clearTimeout(state.burstTapTimer);
      $("btnOpenBurst").textContent = "Разрыв / Корректура";
      renderTable();
      renderPrkPanel();
      saveWorkState();
      showToast("Строка удалена");
      return;
    }

    let pr = 0;
    let ur = state.calc ? state.calc.ur : 3000;
    let napr = 0;
    let rashodSum = 0;
    let seenP = false;
    let seenM = false;
    let ready = false;
    let ffeOn = false;

    state.rows.forEach(function (r, i) {
      r.num = i + 1;
      if (i === 0) {
        pr = parseInt(r.pr, 10) || 0;
        if (r.ur) ur = parseMils(r.ur);
        napr = parseMils(String(r.napr || "0").replace("ОН", "").trim());
      } else if (typeof r.dPr === "number") {
        pr += r.dPr;
        napr += (r.beta || 0);
        if (typeof r.dUr === "number") ur += r.dUr;
      }
      if (!r.isSummaryRow && r.rashod !== "") {
        rashodSum += (parseInt(r.rashod, 10) || 0);
      }
      if (r.obs) {
        if (r.obsSign === "+") seenP = true;
        if (r.obsSign === "-") seenM = true;
        if (r.obsReady) ready = true;
      }
      if (r.fireMode === "battery" || r.fireMode === "same") {
        ready = false;
        ffeOn = true;
      }
    });

    state.currentPr = pr;
    state.currentUr = ur;
    state.currentNapr = napr;
    state.totalRashod = rashodSum;
    state.seenPlus = seenP;
    state.seenMinus = seenM;
    state.readyForEffect = ready;
    state.ffeActive = ffeOn;
    state.forkAlreadyHalved = false;
    state.lastBurst = null;
    if (!(seenP && seenM) && state.tsData && state.tsData.vd) {
      const dxStep = Math.max(1, state.inputs.dxTys || 10);
      const evenStep = 2 * dxStep;
      const fork8 = Math.max(evenStep, Math.round((8 * state.tsData.vd) / evenStep) * evenStep);
      $("bForkStep").value = String(fork8);
    }
    state.burstTapCount = 0;
    clearTimeout(state.burstTapTimer);
    $("btnOpenBurst").textContent = "Разрыв / Корректура";
    renderTable();
    renderPrkPanel();
    saveWorkState();
    showToast("Строка удалена, данные пересчитаны");
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function generateCommand1() {
    if (!state.calc) computeAll();
    const pr = parseInt($("cmd1Pr").value, 10) || state.calc.effectivePr || 0;
    const ur = state.calc.ur;
    const napr = state.calc.deltai;
    const cmdText = $("cmd1Preview").value.trim();

    state.rows = [
      {
        num: 1,
        cmd: cmdText,
        pr: String(pr),
        ur: fmtMils(ur, false),
        napr: "ОН " + fmtMils(napr, true),
        obs: "",
        rashod: 1
      }
    ];
    state.currentPr = pr;
    state.currentUr = ur;
    state.currentNapr = napr;
    state.totalRashod = 1;

    state.lastBurst = null;
    state.seenPlus = false;
    state.seenMinus = false;
    state.readyForEffect = false;
    state.forkAlreadyHalved = false;
    state.ffeActive = false;
    if (state.tsData && state.tsData.vd) {
      const dxStep = Math.max(1, state.inputs.dxTys || 10);
      const evenStep = 2 * dxStep;
      const fork8 = Math.max(evenStep, Math.round((8 * state.tsData.vd) / evenStep) * evenStep);
      $("bForkStep").value = String(fork8);
    }
    renderTable();
    renderPrkPanel();
    renderLearnPanel();
    switchTab("table");
    saveWorkState();
    showToast("1-я команда занесена в таблицу");
  }

  function calcBurstPreview() {
    const c = state.calc;
    if (!c) return { valid: false };

    const dxTys = Math.max(0.1, state.inputs.dxTys);

    if (state.burstMode === "burst") {
      const side = $("bDirSide").value;
      const rawDir = parseMils($("bDirVal").value);
      const alphaObs = side === "L" ? -Math.abs(rawDir) : side === "R" ? Math.abs(rawDir) : 0;

      const rSign = $("bRangeSign").value;
      const rMetersRaw = $("bRangeMeters").value.trim();
      const forkStep = parseFloat($("bForkStep").value) || 200;
      const seriesMode = $("bSeriesMode").value;

      let deltaD = 0;
      let obsStr = "";
      if (side === "L") obsStr += "Л " + fmtMils(Math.abs(rawDir), false) + " ";
      else if (side === "R") obsStr += "П " + fmtMils(Math.abs(rawDir), false) + " ";
      else obsStr += "0 ";

      const gcVal = state.inputs.gc !== null ? state.inputs.gc : 100;
      const vdVal = state.tsData ? state.tsData.vd : 25;
      const stepPreob = gcVal < 100 ? vdVal : c.skMeters;
      const stepOnly = gcVal < 100 ? (2 * vdVal) : Math.round(c.skMeters * 1.5);

      if (seriesMode === "equal") {
        obsStr = "Равенство + и − (" + obsStr.trim() + ")";
        deltaD = 0;
      } else if (seriesMode === "preob_plus") {
        obsStr = "Преобл. «+» отн. ДГЦ (" + obsStr.trim() + ")";
        deltaD = stepPreob;
      } else if (seriesMode === "preob_minus") {
        obsStr = "Преобл. «−» отн. БГЦ (" + obsStr.trim() + ")";
        deltaD = -stepPreob;
      } else if (seriesMode === "only_plus") {
        obsStr = "Только «+» (" + obsStr.trim() + ")";
        deltaD = stepOnly;
      } else if (seriesMode === "only_minus") {
        obsStr = "Только «–» (" + obsStr.trim() + ")";
        deltaD = -stepOnly;
      } else {
        if (rSign === "target") {
          obsStr += "Цель";
          deltaD = 0;
        } else if (rSign === "?") {
          obsStr += "?";
          deltaD = 0;
        } else if (rMetersRaw !== "") {
          const m = Math.abs(parseFloat(rMetersRaw) || 0);
          deltaD = rSign === "+" ? m : -m;
          obsStr += (rSign === "+" ? "+" : "-") + m;
        } else {
          const willBracket = (state.seenPlus || rSign === "+") && (state.seenMinus || rSign === "-");
          const effStep = willBracket ? Math.max(2 * dxTys, Math.round(forkStep / 2)) : forkStep;
          deltaD = rSign === "+" ? effStep : -effStep;
          obsStr += rSign;
        }
      }

      const useExact = $("bExactPs") && $("bExactPs").checked && state.inputs.knpX !== null && state.inputs.opX !== null;
      let beta = 0;
      let dPr = 0;
      if (useExact) {
        const akRadR = milsToRad(norm6000(state.inputs.ak + alphaObs));
        const dkR = (state.inputs.dk || 0) + deltaD;
        const xr = state.inputs.knpX + dkR * Math.cos(akRadR);
        const yr = state.inputs.knpY + dkR * Math.sin(akRadR);
        const drOp = Math.hypot(xr - state.inputs.opX, yr - state.inputs.opY);
        const arOp = radToMils(Math.atan2(yr - state.inputs.opY, xr - state.inputs.opX));
        const dRangeOp = drOp - c.dct;
        const dDirOp = normDelta(arOp - c.act);
        const mortSign = (!isMortarMode() && state.inputs.d30Mode === "mort") ? -1 : 1;
        dPr = Math.round(mortSign * (-dRangeOp / dxTys));
        beta = -dDirOp;
      } else {
        const opRightSign = c.ps >= 0 ? -1 : 1;
        const mortSign = (!isMortarMode() && state.inputs.d30Mode === "mort") ? -1 : 1;
        beta = Math.round(-alphaObs * c.ku + opRightSign * (deltaD / 100) * c.shu);
        dPr = Math.round(mortSign * (-deltaD / dxTys));
      }

      let dUr = 0;
      let hObs = "";
      if (state.inputs.fuzeMode === "dt" && $("bHeightType")) {
        const hType = $("bHeightType").value;
        if (hType === "mils") {
          const mRk = Math.abs(parseMils($("bHeightMils").value));
          const mR = Math.round(mRk * c.ku);
          dUr = c.mOpt - mR;
          hObs = " В " + fmtMils(mRk, false);
        } else if (hType === "impact") {
          dUr = Math.max(4, c.mOpt || 4);
          hObs = " Удар";
        } else if (hType === "high") {
          dUr = -Math.max(3, Math.round((c.mOpt || 4) * 0.75));
          hObs = " Высокий";
        }
      }
      return {
        valid: true,
        obsText: (obsStr.trim() + hObs).trim(),
        beta: beta,
        dPr: dPr,
        dUr: dUr,
        deltaD: deltaD
      };
    } else {
      const refType = $("pRefType").value;
      const nsDir = $("pNsDir").value;
      const nsVal = Math.abs(parseFloat($("pNsVal").value) || 0);
      const ewDir = $("pEwDir").value;
      const ewVal = Math.abs(parseFloat($("pEwVal").value) || 0);

      let dxGeo = nsDir === "N" ? nsVal : -nsVal;
      let dyGeo = ewDir === "E" ? ewVal : -ewVal;

      const obsLabel =
        (refType === "burst" ? "Разрыв: " : "Сдвиг: ") +
        (nsDir === "N" ? "С " : "Ю ") + nsVal + ", " +
        (ewDir === "E" ? "В " : "З ") + ewVal;

      if (refType === "burst") {
        dxGeo = -dxGeo;
        dyGeo = -dyGeo;
      }

      const aRad = c.actRad;
      const dRange = dxGeo * Math.cos(aRad) + dyGeo * Math.sin(aRad);
      const dSide = -dxGeo * Math.sin(aRad) + dyGeo * Math.cos(aRad);

      const mortSignPkss = (!isMortarMode() && state.inputs.d30Mode === "mort") ? -1 : 1;
      const dPr = Math.round(mortSignPkss * (dRange / dxTys));
      const beta = c.dct > 0 ? Math.round(dSide / (0.001 * c.dct)) : 0;

      return {
        valid: true,
        obsText: obsLabel,
        beta: beta,
        dPr: dPr,
        deltaD: Math.round(dRange)
      };
    }
  }

  function updateBurstPreview() {
    const res = calcBurstPreview();
    if (!res.valid) {
      $("burstPreviewText").textContent = "Сначала выполните расчёт.";
      return;
    }
    const signPr = res.dPr > 0 ? "+" + res.dPr : String(res.dPr);
    const newPr = state.currentPr + res.dPr;
    const newNapr = state.currentNapr + res.beta;
    const psWarn = state.calc && Math.abs(state.calc.ps) >= 500 ? " | ⚠ ПС≥5-00 (ст.98: ПРК/ПУО)" : "";
    if ($("dtHeightPanel")) {
      $("dtHeightPanel").classList.toggle("hidden", state.inputs.fuzeMode !== "dt");
    }
    const urPart = res.dUr ? (" | ΔУр: " + fmtMils(res.dUr, true) + " → Ур " + fmtMils(state.currentUr + res.dUr, false)) : "";
    $("burstPreviewText").textContent =
      "ΔХтыс=" + state.inputs.dxTys + "м | ΔПр: " + signPr + " тыс. (ΔД " + res.deltaD + " м) → Пр " + newPr +
      " | β: " + fmtMils(res.beta, true) + " → Напр " + fmtMils(newNapr, true) + urPart + psWarn;
  }

  function applyBurstCorrection() {
    if (state.rows.length === 0) {
      showToast("Сначала сформируйте 1-ю команду!");
      return;
    }
    const res = calcBurstPreview();
    if (!res.valid) return;

    const rSign = $("bRangeSign").value;
    const seriesMode = $("bSeriesMode").value;

    const prevRow = state.rows[state.rows.length - 1];
    prevRow.obs = res.obsText;
    prevRow.obsSign = (seriesMode === "single" && (rSign === "+" || rSign === "-")) ? rSign : "";
    prevRow.obsReady = false;
    const rMetersRaw = $("bRangeMeters").value.trim();
    const forkStep = parseFloat($("bForkStep").value) || 200;
    const vd = state.tsData ? state.tsData.vd : 25;
    const gcVal = state.inputs.gc !== null ? state.inputs.gc : 100;
    const ffeThreshold = gcVal < 100 ? (2 * vd) : (4 * vd);

    if (seriesMode === "single") {
      if (rSign === "+") state.seenPlus = true;
      if (rSign === "-") state.seenMinus = true;

      const sideRaw = Math.abs(parseMils($("bDirVal").value));
      const maxMeasuredD = gcVal < 100 ? 100 : 200;
      const measuredOk = rMetersRaw !== "" && Math.abs(res.deltaD) <= maxMeasuredD && sideRaw <= 20;
      const dxStep = Math.max(1, state.inputs.dxTys || 10);
      const nextFork = Math.max(2 * dxStep, Math.round(forkStep / 2));
      const bracketOk = state.seenPlus && state.seenMinus && (forkStep / 2) <= ffeThreshold;

      if (rSign === "target" || measuredOk || bracketOk) {
        state.readyForEffect = true;
        prevRow.obsReady = true;
        if (state.seenPlus && state.seenMinus) {
          $("bForkStep").value = String(nextFork);
          state.forkAlreadyHalved = true;
        }
      } else if (state.seenPlus && state.seenMinus) {
        $("bForkStep").value = String(nextFork);
        state.forkAlreadyHalved = true;
        showToast("Вилка сужена до " + $("bForkStep").value + " м (порог " + ffeThreshold + " м)");
      }
    }

    const mode = $("bFireMode").value;
    const shellsPerGun = Math.max(1, parseInt($("bShellsPerGun").value, 10) || 2);
    const numUstRange = gcVal < 100 ? 1 : 3;
    const numUstDir = state.calc.useTwoUglom ? 2 : 1;
    const ivText = state.calc.fcMeters <= 50 ? "Сосредоточенный. " : (state.calc.iv > 0 ? ("Iв " + fmtMils(state.calc.iv, false) + ". ") : "Веер параллельный. ");
    const ugText = state.calc.useTwoUglom ? ("Углом. 2 (±" + fmtMils(state.calc.uglomShift, false) + "). ") : "";
    let cmdStr = isMortarMode() ? "Осн. 1 мин. Ог." : "Осн. 1 сн. Ог.";
    let shotCount = 1;
    if (mode === "battery") {
      cmdStr = gcVal < 100
        ? ("Батарее. " + ivText + ugText + "по " + shellsPerGun + (isMortarMode() ? " мин. бег. Ог." : " сн. бег. Ог."))
        : ("Батарее. " + ivText + ugText + "Уст 2. Ск. " + state.calc.skTys + ". по " + shellsPerGun + (isMortarMode() ? " мин. бег. Ог." : " сн. бег. Ог."));
      shotCount = state.inputs.guns * shellsPerGun * numUstRange * numUstDir;
      state.readyForEffect = false;
      state.ffeActive = true;
    } else if (mode === "same") {
      cmdStr = "по " + shellsPerGun + (isMortarMode() ? " мин. бег. Ог." : " сн. бег. Ог.");
      shotCount = state.inputs.guns * shellsPerGun * numUstRange * numUstDir;
      state.readyForEffect = false;
      state.ffeActive = true;
    }

    const dUrVal = res.dUr || 0;
    state.currentPr += res.dPr;
    state.currentUr += dUrVal;
    state.currentNapr += res.beta;
    state.totalRashod += shotCount;

    const signPr = res.dPr > 0 ? "+" + res.dPr : String(res.dPr);
    const rowPrText = mode === "battery" ? String(state.currentPr) : signPr;
    const rowUrText = dUrVal !== 0 ? (mode === "battery" ? fmtMils(state.currentUr, false) : fmtMils(dUrVal, true)) : "";
    const rowNaprText = mode === "battery" ? fmtMils(state.currentNapr, true) : fmtMils(res.beta, true);

    state.lastBurst = {
      obsText: res.obsText,
      beta: res.beta,
      dPr: res.dPr,
      dUr: dUrVal,
      deltaD: res.deltaD
    };

    state.rows.push({
      num: state.rows.length + 1,
      cmd: cmdStr,
      pr: rowPrText,
      ur: rowUrText,
      napr: rowNaprText,
      obs: "",
      rashod: shotCount,
      dPr: res.dPr,
      dUr: dUrVal,
      beta: res.beta,
      fireMode: mode
    });
    saveWorkState();

    closeModal("modalBurst");
    renderTable();
    renderPrkPanel();
    renderLearnPanel();
    showToast("Корректура добавлена в таблицу");
  }

  function addSpecialRow(type) {
    if (state.rows.length === 0) {
      showToast("Таблица пуста");
      return;
    }
    const inp = state.inputs;
    if (type === "ffe") {
      const shells = inp.guns * 12;
      state.totalRashod += shells;
      state.rows.push({
        num: state.rows.length + 1,
        cmd: "Батарее. Iв " + fmtMils(state.calc.iv, false) + ". Уст 2. Ск. " + state.calc.skTys + ". по 2" + (isMortarMode() ? " мин. бег. Ог." : " сн. бег. Ог."),
        pr: String(state.currentPr),
        ur: "",
        napr: fmtMils(state.currentNapr, true),
        obs: "",
        rashod: shells
      });
    } else if (type === "record") {
      state.rows.push({
        num: state.rows.length + 1,
        cmd: "«" + inp.callKnp + "», Стой. Записать. Цель " + inp.goalNum + "-я, " + inp.goalType + ". Расход " + state.totalRashod + ".",
        pr: String(state.currentPr),
        ur: fmtMils(state.currentUr, false),
        napr: fmtMils(state.currentNapr, true),
        obs: "",
        rashod: state.totalRashod,
        isSummaryRow: true
      });
    } else if (type === "finish") {
      state.rows.push({
        num: state.rows.length + 1,
        cmd: "«" + inp.callCmd + "», Я «" + inp.callKnp + "», по Цели " + inp.goalNum + "-й стрельбу окончил. Расход " + state.totalRashod + ". Я «" + inp.callKnp + "».",
        pr: "",
        ur: "",
        napr: "",
        obs: "Цель подавлена",
        rashod: ""
      });
    }
    saveWorkState();
    renderTable();
  }

  function logAngleRad(val) {
    let v = Math.abs(val);
    if (v <= 0) v = 1;
    while (v >= 10) v /= 10;
    while (v < 1) v *= 10;
    return Math.log10(v) * 2 * Math.PI;
  }

  function renderMarksList(marks, cx, cy) {
    return marks
      .map(function (mk) {
        if (mk.type === "point") {
          return '<circle cx="' + mk.x.toFixed(1) + '" cy="' + mk.y.toFixed(1) + '" r="3.8" fill="#16a34a" stroke="#fff" stroke-width="1"/>';
        }
        if (mk.type === "tick") {
          const dx = mk.x - cx;
          const dy = mk.y - cy;
          const len = Math.hypot(dx, dy) || 1;
          const ux = dx / len;
          const uy = dy / len;
          const x1 = mk.x - ux * 7;
          const y1 = mk.y - uy * 7;
          const x2 = mk.x + ux * 7;
          const y2 = mk.y + uy * 7;
          return '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#d97706" stroke-width="2.4" stroke-linecap="round"/>';
        }
        return '<g stroke="#dc2626" stroke-width="2.2"><line x1="' + (mk.x - 4.5).toFixed(1) + '" y1="' + (mk.y - 4.5).toFixed(1) + '" x2="' + (mk.x + 4.5).toFixed(1) + '" y2="' + (mk.y + 4.5).toFixed(1) + '"/><line x1="' + (mk.x + 4.5).toFixed(1) + '" y1="' + (mk.y - 4.5).toFixed(1) + '" x2="' + (mk.x - 4.5).toFixed(1) + '" y2="' + (mk.y + 4.5).toFixed(1) + '"/></g>';
      })
      .join("");
  }

  function renderPrkPanel() {
    const c = state.calc;
    const inp = state.inputs;
    const is69 = state.prkModel === "69";

    const psMils = c ? Math.abs(c.ps) : 524;
    const dkVal = inp.dk || 2660;
    const dctVal = c ? c.dct : 4494;
    const opSideTxt = c ? c.opSide : "ОП справа";

    const logDct = Math.round((logAngleRad(dctVal) / (2 * Math.PI)) * 6000);
    const logDk = Math.round((logAngleRad(dkVal) / (2 * Math.PI)) * 6000);
    const autoAngleL = state.lastBurst ? normDelta(logDct + Math.round((logAngleRad(Math.max(10, Math.abs(state.lastBurst.beta || 10))) / (2 * Math.PI)) * 6000)) : logDct;
    const autoAngleR = state.lastBurst ? normDelta(logDct + Math.round((logAngleRad(Math.max(10, Math.abs(state.lastBurst.deltaD || 100))) / (2 * Math.PI)) * 6000)) : logDk;

    const angleL = state.prkManual ? state.prkAngle : (is69 ? autoAngleL : (c ? c.ps : 0));
    const angleR = state.prkManual ? state.prkAngleRight : autoAngleR;
    const rulerX = state.prkManual ? state.prkRulerX : (state.lastBurst ? Math.max(-70, Math.min(70, -state.lastBurst.beta * 1.1)) : 0);

    $("prkModeLabel").textContent = state.prkManual ? "Отдельная оцифровка (ручной)" : "Авто по задаче";
    $("btnToggleManualPrk").textContent = state.prkManual ? "Вернуться в авто" : "Отдельная оцифровка";
    $("btnToggleManualPrk").classList.toggle("btn-accent", state.prkManual);
    $("btnToggleManualPrk").classList.toggle("btn-outline", !state.prkManual);
    $("prkManualControls").classList.toggle("hidden", !state.prkManual);

    $("prk69CircleRow").classList.toggle("hidden", !is69);
    $("prk75RulerRow").classList.toggle("hidden", is69);
    $("prkRotLabel").textContent = is69
      ? (state.prkActiveCircle === "left" ? "Левый круг:" : "Правый круг:")
      : "Поворот круга:";
    $("prkAngleSlider").value = String(Math.round(is69 && state.prkActiveCircle === "right" ? angleR : angleL));
    $("prkRulerSlider").value = String(Math.round(rulerX));

    if (c) {
      $("prkPs").textContent = fmtMils(Math.abs(c.ps), false) + " (" + c.opSide + ")";
      $("prkDists").textContent = c.dct + " м / " + inp.dk + " м";
      const lb = state.lastBurst ? (" | " + state.lastBurst.obsText) : "";
      $("prkKuShu").textContent = c.ku.toFixed(1) + " / " + fmtMils(c.shu, false) + lb;
    } else {
      $("prkPs").textContent = state.prkManual ? fmtMils(angleL, true) : "—";
      $("prkDists").textContent = "—";
      $("prkKuShu").textContent = "—";
    }

    const svg = $("prkSvg");
    let svgBody = "";

    function drawPrk69Dial(cx, cy, rOut, rIn, rotMils, sideKey, title, trigOuter, trigInner, dAngleDeg, uAngleDeg) {
      const deg = (rotMils * 360) / 6000;
      let t = '<circle cx="' + cx + '" cy="' + cy + '" r="' + rOut + '" fill="#dbd6be" stroke="#3c4036" stroke-width="1.5"/>';
      t += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (rOut - 13) + '" fill="none" stroke="#5c6152" stroke-width="0.7"/>';
      t += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (rOut - 24) + '" fill="none" stroke="#5c6152" stroke-width="0.7"/>';

      // Внешняя шкала чисел (начинается с 1000 внизу на 6 часах, как на реальном ПРК-69!)
      const scaleLabels = [
        [1, "1000"], [1.5, ""], [2, "2000"], [3, "3000"], [4, "4000"], [5, "5000"],
        [6, "6"], [7, "7"], [8, "8"], [9, "9"]
      ];
      for (let n10 = 10; n10 <= 98; n10 += 2) {
        const val = n10 / 10;
        const a = logAngleRad(val) + Math.PI; // 1 внизу (6 часов)
        const isWhole = n10 % 10 === 0;
        const r1 = rOut;
        const r2 = isWhole ? rOut - 6.5 : (n10 % 5 === 0 ? rOut - 4.5 : rOut - 3);
        t += '<line x1="' + (cx + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (cy - r1 * Math.cos(a)).toFixed(1) +
             '" x2="' + (cx + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (cy - r2 * Math.cos(a)).toFixed(1) +
             '" stroke="#1f2820" stroke-width="' + (isWhole ? '1.2' : '0.6') + '"/>';
      }
      scaleLabels.forEach(function (pair) {
        const a = logAngleRad(pair[0]) + Math.PI;
        const rt = rOut - 10;
        const lbl = pair[0] === 1 ? "1" : (pair[0] <= 5 ? String(pair[0]) : String(pair[0]));
        t += '<text x="' + (cx + rt * Math.sin(a)).toFixed(1) + '" y="' + (cy - rt * Math.cos(a) + 2.5).toFixed(1) + '" text-anchor="middle" fill="#1f2820" font-size="6.8" font-weight="800">' + lbl + '</text>';
        if (pair[1]) {
          const ro = rOut + 7.5;
          t += '<text x="' + (cx + ro * Math.sin(a)).toFixed(1) + '" y="' + (cy - ro * Math.cos(a) + 2.5).toFixed(1) + '" text-anchor="middle" fill="#2a2d26" font-size="5.8" font-weight="700">' + pair[1] + '</text>';
        }
      });

      // Подписи тригонометрических шкал
      t += '<text x="' + cx + '" y="' + (cy - rOut + 21) + '" text-anchor="middle" fill="#3c4036" font-size="5.8" font-weight="700">' + trigOuter + '</text>';
      t += '<text x="' + cx + '" y="' + (cy - rIn + 11) + '" text-anchor="middle" fill="#3c4036" font-size="5.8" font-weight="700">' + trigInner + '</text>';

      // Внутренняя шкала Cosec / Sec (деления 0-10 .. 15)
      for (let k = 0; k <= 14; k++) {
        const a = (k / 15) * 1.7 * Math.PI + 0.3;
        t += '<line x1="' + (cx + (rIn + 5) * Math.sin(a)).toFixed(1) + '" y1="' + (cy - (rIn + 5) * Math.cos(a)).toFixed(1) +
             '" x2="' + (cx + (rIn + 1) * Math.sin(a)).toFixed(1) + '" y2="' + (cy - (rIn + 1) * Math.cos(a)).toFixed(1) + '" stroke="#3c4036" stroke-width="0.7"/>';
      }

      // ВРАЩАЮЩИЙСЯ ПРОЗРАЧНЫЙ КРУГ + ВСЕ ПОЛЬЗОВАТЕЛЬСКИЕ МЕТКИ, ПРИВЯЗАННЫЕ К НЕМУ!
      t += '<g transform="rotate(' + deg.toFixed(2) + ' ' + cx + ' ' + cy + ')">';
      t += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rIn + '" fill="rgba(255,255,255,0.42)" stroke="#444" stroke-width="1"/>';
      // Рифлёное кольцо на прозрачном круге как на фото
      t += '<circle cx="' + cx + '" cy="' + cy + '" r="' + Math.round(rIn * 0.72) + '" fill="none" stroke="rgba(90,95,80,0.45)" stroke-width="5" stroke-dasharray="1.5 1.5"/>';
      t += '<circle cx="' + cx + '" cy="' + cy + '" r="' + Math.round(rIn * 0.56) + '" fill="rgba(219,214,190,0.45)" stroke="#666" stroke-width="0.7"/>';

      // Постоянный красный указатель (вверх на 12 часов в системе круга, или вниз на 6)
      const ptrAngle = Math.PI; // 6 часов (на 1000)
      t += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + (rOut - 2) * Math.sin(ptrAngle)).toFixed(1) + '" y2="' + (cy - (rOut - 2) * Math.cos(ptrAngle)).toFixed(1) + '" stroke="#dc2626" stroke-width="2"/>';

      // Карандашная риска Д
      const dRad = (dAngleDeg * Math.PI) / 180 + Math.PI;
      t += '<line x1="' + (cx + (rIn + 2) * Math.sin(dRad)).toFixed(1) + '" y1="' + (cy - (rIn + 2) * Math.cos(dRad)).toFixed(1) +
           '" x2="' + (cx + (rOut - 1) * Math.sin(dRad)).toFixed(1) + '" y2="' + (cy - (rOut - 1) * Math.cos(dRad)).toFixed(1) + '" stroke="#15803d" stroke-width="2"/>';
      t += '<text x="' + (cx + (rIn - 8) * Math.sin(dRad)).toFixed(1) + '" y="' + (cy - (rIn - 8) * Math.cos(dRad) + 3).toFixed(1) + '" text-anchor="middle" fill="#15803d" font-size="8.5" font-weight="900">Д</text>';

      // Карандашная риска У
      const uRad = (uAngleDeg * Math.PI) / 180 + Math.PI;
      t += '<line x1="' + (cx + (rIn + 2) * Math.sin(uRad)).toFixed(1) + '" y1="' + (cy - (rIn + 2) * Math.cos(uRad)).toFixed(1) +
           '" x2="' + (cx + (rOut - 1) * Math.sin(uRad)).toFixed(1) + '" y2="' + (cy - (rOut - 1) * Math.cos(uRad)).toFixed(1) + '" stroke="#b45309" stroke-width="2"/>';
      t += '<text x="' + (cx + (rIn - 8) * Math.sin(uRad)).toFixed(1) + '" y="' + (cy - (rIn - 8) * Math.cos(uRad) + 3).toFixed(1) + '" text-anchor="middle" fill="#b45309" font-size="8.5" font-weight="900">У</text>';

      // Привязанные к этому кругу пользовательские метки!
      const circleMarks = state.prkMarks.filter(function (m) { return m.target === sideKey; });
      t += renderMarksList(circleMarks, cx, cy);

      t += '</g>';
      t += '<circle cx="' + cx + '" cy="' + cy + '" r="8" fill="#4b5046" stroke="#1f2820" stroke-width="1.2"/>';
      t += '<text x="' + (sideKey === "left" ? 26 : 354) + '" y="182" text-anchor="' + (sideKey === "left" ? "start" : "end") + '" fill="#1f2820" font-size="9" font-weight="800">' + title + '</text>';
      return t;
    }

    if (is69) {
      svgBody += '<rect x="4" y="6" width="372" height="268" rx="8" fill="#cfc9ad" stroke="#4a5040" stroke-width="2"/>';
      // Окошко αц сверху
      svgBody += '<text x="190" y="23" text-anchor="middle" fill="#1f2820" font-size="8" font-weight="800">αц</text>';
      svgBody += '<rect x="176" y="26" width="28" height="14" rx="2" fill="#e5e7eb" stroke="#444"/>';
      svgBody += '<text x="190" y="36" text-anchor="middle" fill="#111" font-size="8" font-weight="700">' + (c ? fmtMils(c.act, false) : "—") + '</text>';

      const dDegL = (logAngleRad(dkVal) * 180) / Math.PI;
      const uDegL = (dDegL + 115) % 360;
      const dDegR = 0;
      const uDegR = ((logAngleRad(dctVal) * 180) / Math.PI + 80) % 360;

      svgBody += drawPrk69Dial(94, 102, 70, 44, angleL, "left", "ЛЕВЫЙ", "ШКАЛА Ctg", "ШКАЛА Cosec", dDegL, uDegL);
      svgBody += drawPrk69Dial(286, 102, 70, 44, angleR, "right", "ПРАВЫЙ", "ШКАЛА tg", "ШКАЛА Sec", dDegR, uDegR);

      // Круглое окошко со схемой КНП-ОП-Цель
      svgBody += '<circle cx="190" cy="176" r="18" fill="#e5e7eb" stroke="#444" stroke-width="1.5"/>';
      svgBody += '<line x1="190" y1="164" x2="181" y2="186" stroke="#2563eb" stroke-width="1.5"/>';
      svgBody += '<line x1="190" y1="164" x2="' + (c && c.ps < 0 ? 174 : 201) + '" y2="186" stroke="#dc2626" stroke-width="1.5"/>';
      svgBody += '<text x="190" y="191" text-anchor="middle" fill="#111" font-size="6.5" font-weight="800">' + (c ? (c.ps >= 0 ? "ОП ПР" : "ОП ЛВ") : "ОП") + '</text>';

      // Таблички и 4 квадратных окошка корректур как на фото i.jpeg
      svgBody += '<text x="115" y="214" text-anchor="end" fill="#1f2820" font-size="7.5" font-weight="800">ЗАПИСАТЬ КОРРЕКТУРУ:</text>';
      svgBody += '<text x="145" y="210" text-anchor="end" fill="#1f2820" font-size="7" font-weight="700">ПРИЦЕЛА</text>';
      svgBody += '<text x="145" y="224" text-anchor="end" fill="#1f2820" font-size="7" font-weight="700">УГЛОМЕРА</text>';

      const prSign = state.lastBurst ? (state.lastBurst.dPr >= 0 ? "+" : "−") : "+";
      const betaSign = state.lastBurst ? (state.lastBurst.beta >= 0 ? "+" : "−") : "−";

      // Окошки ЛЕВЫЙ / ПРАВЫЙ
      svgBody += '<rect x="150" y="200" width="18" height="13" fill="#e5e7eb" stroke="#444"/><text x="159" y="210" text-anchor="middle" fill="#1d4ed8" font-size="10" font-weight="800">' + prSign + '</text>';
      svgBody += '<rect x="150" y="214" width="18" height="13" fill="#e5e7eb" stroke="#444"/><text x="159" y="224" text-anchor="middle" fill="#1d4ed8" font-size="10" font-weight="800">' + betaSign + '</text>';

      svgBody += '<rect x="212" y="200" width="18" height="13" fill="#e5e7eb" stroke="#444"/><text x="221" y="210" text-anchor="middle" fill="#1d4ed8" font-size="10" font-weight="800">' + prSign + '</text>';
      svgBody += '<rect x="212" y="214" width="18" height="13" fill="#e5e7eb" stroke="#444"/><text x="221" y="224" text-anchor="middle" fill="#1d4ed8" font-size="10" font-weight="800">' + betaSign + '</text>';

      const prValTxt = state.lastBurst ? ((state.lastBurst.dPr >= 0 ? "+" : "") + state.lastBurst.dPr) : "0";
      const bValTxt = state.lastBurst ? fmtMils(state.lastBurst.beta, true) : "0-00";
      svgBody += '<rect x="234" y="200" width="90" height="13" fill="rgba(255,255,255,0.5)" stroke="#666"/><text x="279" y="210" text-anchor="middle" fill="#b45309" font-size="8.5" font-weight="800" font-family="monospace">ΔПр = ' + prValTxt + '</text>';
      svgBody += '<rect x="234" y="214" width="90" height="13" fill="rgba(255,255,255,0.5)" stroke="#666"/><text x="279" y="224" text-anchor="middle" fill="#15803d" font-size="8.5" font-weight="800" font-family="monospace">β = ' + bValTxt + '</text>';

      // Нижние надписи движков как на фото
      svgBody += '<text x="72" y="256" text-anchor="middle" fill="#1f2820" font-size="7.5" font-weight="800">С   ВЛЕВО | ВПРАВО   Ю</text>';
      svgBody += '<text x="190" y="256" text-anchor="middle" fill="#dc2626" font-size="9" font-weight="800">↑</text>';
      svgBody += '<text x="304" y="256" text-anchor="middle" fill="#1f2820" font-size="7" font-weight="800">З  НЕДОЛЁТ | ПЕРЕЛЁТ  В</text>';
    } else {
      const cx = 190;
      const cy = 148;
      const rOut = 104;
      const deg = (angleL * 360) / 6000;

      svgBody += '<rect x="30" y="8" width="320" height="264" rx="8" fill="#c4c9c7" stroke="#525a56" stroke-width="2"/>';
      svgBody += '<rect x="38" y="14" width="304" height="22" rx="3" fill="#9ea6a3" stroke="#444"/>';
      for (let step = -4; step <= 4; step += 0.5) {
        const tx = cx + step * 32;
        const isMaj = Number.isInteger(step);
        svgBody += '<line x1="' + tx + '" y1="' + (isMaj ? 29 : 32) + '" x2="' + tx + '" y2="36" stroke="#111" stroke-width="' + (isMaj ? 1.1 : 0.7) + '"/>';
        if (isMaj) {
          svgBody += '<text x="' + tx + '" y="26" text-anchor="middle" fill="#111" font-size="7" font-weight="800">' + Math.abs(step * 100) + '</text>';
        }
      }

      svgBody += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rOut + '" fill="#e5e7e6" stroke="#3b4440" stroke-width="2"/>';
      // Веер угломерного графика
      for (let i = -6; i <= 6; i++) {
        const ang = (i * 8 * Math.PI) / 180;
        svgBody += '<line x1="' + cx + '" y1="' + (cy - rOut) + '" x2="' + (cx + rOut * 1.3 * Math.sin(ang)).toFixed(1) + '" y2="' + (cy + rOut * 0.88) + '" stroke="rgba(60,70,65,0.34)" stroke-width="0.8"/>';
      }
      [35, 70].forEach(function (rr) {
        svgBody += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rr + '" fill="none" stroke="rgba(60,70,65,0.28)" stroke-dasharray="3 3"/>';
      });

      for (let p = -15; p <= 15; p += 5) {
        const a = (p * 100 * 2 * Math.PI) / 6000;
        const px = cx + (rOut + 10) * Math.sin(a);
        const py = cy + (rOut + 10) * Math.cos(a);
        svgBody += '<text x="' + px.toFixed(1) + '" y="' + py.toFixed(1) + '" text-anchor="middle" fill="#1f2820" font-size="7.5" font-weight="700">' + (p === 0 ? "0" : Math.abs(p) + "-00") + '</text>';
      }

      // ПОВОРОТНЫЙ КРУГ ПРК-75 + ПРИВЯЗАННЫЕ К НЕМУ МЕТКИ!
      svgBody += '<g transform="rotate(' + deg.toFixed(2) + ' ' + cx + ' ' + cy + ')">';
      svgBody += '<line x1="' + (cx - rOut + 4) + '" y1="' + cy + '" x2="' + (cx + rOut - 4) + '" y2="' + cy + '" stroke="#dc2626" stroke-width="1.6"/>';
      svgBody += '<line x1="' + cx + '" y1="' + (cy - rOut + 4) + '" x2="' + cx + '" y2="' + (cy + rOut - 4) + '" stroke="#15803d" stroke-width="1.8"/>';
      svgBody += '<line x1="' + cx + '" y1="' + (cy + rOut - 14) + '" x2="' + cx + '" y2="' + (cy + rOut - 1) + '" stroke="#dc2626" stroke-width="3"/>';
      svgBody += '<text x="' + (cx + 14) + '" y="' + (cy + rOut - 6) + '" fill="#dc2626" font-size="9" font-weight="900">ОП</text>';
      const marks75 = state.prkMarks.filter(function (m) { return m.target === "prk75"; });
      svgBody += renderMarksList(marks75, cx, cy);
      svgBody += '</g>';

      const rx = cx + rulerX;
      svgBody += '<rect x="' + (rx - 14) + '" y="12" width="28" height="24" rx="3" fill="#374151" stroke="#111"/>';
      svgBody += '<rect x="' + (rx - 11) + '" y="36" width="22" height="222" fill="rgba(255,255,255,0.9)" stroke="#374151" stroke-width="1.2"/>';
      for (let y = 46; y <= 246; y += 16) {
        svgBody += '<line x1="' + (rx - 11) + '" y1="' + y + '" x2="' + (rx - 4) + '" y2="' + y + '" stroke="#111" stroke-width="0.8"/>';
      }

      const yDk = 88;
      const yDct = 64;
      svgBody += '<line x1="' + (rx - 11) + '" y1="' + yDk + '" x2="' + (rx + 11) + '" y2="' + yDk + '" stroke="#15803d" stroke-width="2.2"/>';
      svgBody += '<text x="' + (rx + 15) + '" y="' + (yDk + 3) + '" fill="#15803d" font-size="8" font-weight="800">Дк ' + (dkVal / 1000).toFixed(1) + '</text>';

      svgBody += '<line x1="' + (rx - 11) + '" y1="' + yDct + '" x2="' + (rx + 11) + '" y2="' + yDct + '" stroke="#b45309" stroke-width="2.2"/>';
      svgBody += '<text x="' + (rx + 15) + '" y="' + (yDct + 3) + '" fill="#b45309" font-size="8" font-weight="800">Дцт ' + (dctVal / 1000).toFixed(1) + '</text>';

      svgBody += '<text x="' + rx + '" y="151" text-anchor="middle" fill="#111" font-size="8" font-weight="800">0</text>';

      if (state.lastBurst && c) {
        const by = cy - Math.max(-80, Math.min(80, state.lastBurst.deltaD * 0.25));
        svgBody += '<circle cx="' + rx.toFixed(1) + '" cy="' + by.toFixed(1) + '" r="5" fill="#dc2626" stroke="#fff" stroke-width="1.2"/>';
        svgBody += '<text x="' + (rx - 16) + '" y="' + (by + 3).toFixed(1) + '" text-anchor="end" fill="#dc2626" font-size="9" font-weight="800">P1</text>';
      }

      svgBody += '<circle cx="' + cx + '" cy="' + cy + '" r="4" fill="#d97706" stroke="#111"/>';
      svgBody += '<text x="314" y="262" text-anchor="middle" fill="#1f2820" font-size="10" font-weight="800">ПРК-75</text>';
    }

    svg.innerHTML = svgBody;

    const psTxt = c ? fmtMils(psMils, false) : "05-24";
    if (is69) {
      $("prkGuideContent").innerHTML =
        "<h3>ПРК-69 (2 круга): точная схема оцифровки</h3>" +
        "<ol>" +
        "<li><b>Левый круг:</b> красный указатель на <b>ПС (" + psTxt + ")</b> по <b>Cosec</b> → против <b>Дк (" + dkVal + " м)</b> ставим риску <b>Д</b>; затем <b>Д</b> совмещаем с <b>Дцт (" + dctVal + " м)</b> → против <b>ПС</b> по <b>Ctg</b> ставим риску <b>У</b>.</li>" +
        "<li><b>Правый круг:</b> красный указатель на <b>ПС (" + psTxt + ")</b> по <b>Sec</b> → против <b>1</b> ставим риску <b>Д</b>; затем <b>Д</b> на <b>Дцт (" + dctVal + " м)</b> → против <b>ПС</b> по <b>tg</b> ставим риску <b>У</b>.</li>" +
        "<li><b>Окно:</b> ставим схему <b>" + opSideTxt + "</b>. Все метки, поставленные в «Отдельной оцифровке», привязаны к своему кругу и вращаются вместе с ним!</li>" +
        "</ol>";
    } else {
      $("prkGuideContent").innerHTML =
        "<h3>ПРК-75 (1 круг + линейка): точная схема оцифровки</h3>" +
        "<ol>" +
        "<li><b>Круг в 0:</b> указатель поворотного круга совмещаем с вертикальной осью (0).</li>" +
        "<li><b>Подвижная линейка:</b> на шкале дальностей ставим риску <b>Дк (" + (dkVal / 1000).toFixed(1) + " км)</b> и риску <b>Дцт (" + (dctVal / 1000).toFixed(1) + " км)</b>.</li>" +
        "<li><b>Поворотный круг:</b> по нижней шкале откладываем <b>ПС (" + psTxt + ")</b> в сторону ОП (<b>" + opSideTxt + "</b>) и ставим риску <b>ОП</b>. Метки вращаются вместе с кругом!</li>" +
        "</ol>";
    }
  }

  function buildAccordionHtml(items) {
    return items
      .map(function (s, i) {
        return (
          '<div class="step-card accordion" data-acc="' + i + '">' +
          '<div class="step-head">' +
          '<div class="step-head-left"><span class="step-num">' + (i + 1) + '</span><span class="step-title">' + s.t + '</span></div>' +
          '<span class="step-chevron">▼</span>' +
          '</div>' +
          '<div class="step-formula">' + s.f + '</div>' +
          '<div class="step-details">' +
          '<div class="step-body">' + s.b + '</div>' +
          (s.keys ? '<div class="calc-keys">' + s.keys + '</div>' : '') +
          '</div>' +
          '</div>'
        );
      })
      .join("");
  }

  function attachAccordionEvents(containerId) {
    $(containerId).querySelectorAll(".step-card.accordion").forEach(function (card) {
      card.addEventListener("click", function () {
        card.classList.toggle("open");
      });
    });
  }

  // --- ВКЛАДКА 4: ОБУЧЕНИЕ ---

  function renderTheoryPanel() {
    const data = Array.isArray(window.SOB_THEORY_DATA) ? window.SOB_THEORY_DATA : [];
    const q = (state.theoryQuery || "").trim().toLowerCase();
    const cat = state.theoryCat || "all";

    const filtered = data.filter(function (item) {
      if (cat !== "all" && item.cat !== cat) return false;
      if (!q) return true;
      const hay = (item.title + " " + item.tags + " " + item.body).toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    if ($("theoryCountPill")) {
      $("theoryCountPill").textContent = filtered.length + " из " + data.length;
    }
    const list = $("theoryList");
    if (!list) return;
    if (filtered.length === 0) {
      list.innerHTML = '<div class="theory-card"><div class="theory-note">Ничего не найдено по запросу «' + escapeHtml(state.theoryQuery) + '».</div></div>';
      return;
    }
    list.innerHTML = filtered.map(function (item) {
      return (
        '<div class="theory-card">' +
        '<div class="theory-card-head">' +
        '<div class="theory-card-title">' + escapeHtml(item.title) + '</div>' +
        '<span class="theory-cat-badge">' + escapeHtml(item.catLabel) + '</span>' +
        '</div>' +
        '<div class="theory-card-body">' + item.body + '</div>' +
        '</div>'
      );
    }).join("");
  }

  function renderLearnPanel() {
    const c = state.calc;
    const inp = state.inputs;

    const ex = c ? {
      knpX: inp.knpX, knpY: inp.knpY, knpH: inp.knpH !== null ? inp.knpH : 95,
      opX: inp.opX, opY: inp.opY, opH: inp.opH !== null ? inp.opH : 125,
      dk: inp.dk, ak: fmtMils(inp.ak, false), akDeg: (inp.ak * 0.06).toFixed(2),
      xt: c.xt, yt: c.yt, dct: c.dct, act: fmtMils(c.act, false),
      on: fmtMils(inp.on || 0, false), deltact: fmtMils(c.deltact, true),
      di: c.di, deltai: fmtMils(c.deltai, true), ur: fmtMils(c.ur, false),
      pr: c.effectivePr, dxTys: inp.dxTys,
      ku: c.ku.toFixed(1), ps: fmtMils(Math.abs(c.ps), false), opSide: c.opSide,
      shu: fmtMils(c.shu, false), skM: c.skMeters, skT: c.skTys, iv: fmtMils(c.iv, false)
    } : {
      knpX: 95916, knpY: 39161, knpH: 95,
      opX: 95365, opY: 42173, opH: 125,
      dk: 2660, ak: "33-98", akDeg: "203.88",
      xt: 93480, yt: 38093, dct: 4494, act: "39-22",
      on: "41-00", deltact: "-1-78",
      di: 4372, deltai: "-1-51", ur: "29-93",
      pr: 174, dxTys: 19,
      ku: "0.6", ps: "5-24", opSide: "ОП справа",
      shu: "0-12", skM: 40, skT: 2, iv: "0-04"
    };

    $("learnDataPill").textContent = c ? "По текущей задаче (тапни на шаг)" : "На примере Варианта №3 (тапни на шаг)";

    const part1Steps = [
      {
        t: "ПГЗ: находим координаты цели (Xц, Yц) через Rec",
        f: "Xц = " + ex.xt + " | Yц = " + ex.yt,
        b: "Сначала переводим дирекционный угол с КНП в градусы: <b>αк° = " + ex.ak.replace("-", "") + " × 0.06 = " + ex.akDeg + "°</b>. Затем функцией <b>Rec</b> раскладываем полярные координаты в приращения ΔX и ΔY и прибавляем к Xкнп, Yкнп.",
        keys: "<b>Калькулятор (режим DEG):</b> Жми <b>SHIFT</b> → <b>− (Rec)</b> → вводи <b>" + ex.dk + " , " + ex.akDeg + " ) =</b>. Получишь <b>X (ΔX)</b> и <b>Y (ΔY)</b>. Прибавь X к <b>" + ex.knpX + "</b>, а Y к <b>" + ex.knpY + "</b>."
      },
      {
        t: "ОГЗ: дальность Дцт и угол αцт от ОП через Pol",
        f: "Дцт = " + ex.dct + " м | αцт = " + ex.act + " | δцт = " + ex.deltact,
        b: "Находим разность координат ΔX = Xц − Xоп и ΔY = Yц − Yоп. Через функцию <b>Pol</b> сразу получаем топографическую дальность <b>r (Дцт)</b> и угол <b>θ°</b>. Если θ° отрицательный — прибавь 360°, затем раздели на 0.06 для тысячных.",
        keys: "<b>Калькулятор:</b> Жми <b>SHIFT</b> → <b>+ (Pol)</b> → вводи <b>(" + ex.xt + "−" + ex.opX + ") , (" + ex.yt + "−" + ex.opY + ") ) =</b>. <b>r = " + ex.dct + " м</b>, угол <b>θ ÷ 0.06 = " + ex.act + "</b>. Доворот: <b>" + ex.act + " − " + ex.on + " = " + ex.deltact + "</b>."
      },
      {
        t: "Исчисленные данные (Ди, δи, Ур) и ТС №145",
        f: "Ди = " + ex.di + " м | δи = " + ex.deltai + " | Ур = " + ex.ur + " | Пр = " + ex.pr,
        b: "Прибавляем поправки из условия задачи: <b>Ди = Дцт + ΔДцис</b>, <b>δи = δцт + Δδиис</b>. Уровень: <b>Ур = 30-00 + (hц − hоп) ÷ (0.001 × Дцт)</b>. По <b>Ди</b> и заряду открываем ТС №145 и снимаем <b>Пр</b> и <b>ΔХтыс = " + ex.dxTys + " м</b>.",
        keys: "<b>Калькулятор для Ур:</b> <b>3000 + (" + ex.knpH + " − " + ex.opH + ") ÷ (0.001 × " + ex.dct + ") =</b>. Если нет разницы высот — пиши <b>30-00</b>."
      },
      {
        t: "Коэффициенты пристрелки: Ку, ПС, Шу, Ск, Iв",
        f: "Ку=" + ex.ku + " | ПС=" + ex.ps + " | Шу=" + ex.shu + " | Ск=" + ex.skM + "м | Iв=" + ex.iv,
        b: "<b>Ку = Дк ÷ Дцт</b> (округляй до десятых). <b>ПС = αк − αцт</b> (если > 0 — ОП справа, если < 0 — ОП слева). <b>Шу = |ПС| ÷ (0.01 × Дцт)</b>. <b>Ск = Гц ÷ 3</b>.",
        keys: "<b>Калькулятор:</b> Ку: <b>" + ex.dk + " ÷ " + ex.dct + " = " + ex.ku + "</b> | Шу: <b>" + parseMils(ex.ps) + " ÷ (0.01 × " + ex.dct + ") = " + parseMils(ex.shu) + " (0-" + String(parseMils(ex.shu)).padStart(2, "0") + ")</b>."
      },
      {
        t: "Подача 1-й команды и запись в таблицу",
        f: "Сн. ОФ, Взр. О, Зар., Основному 1 снаряд. Огонь.",
        b: "Записывай в 1-ю строку таблицы: <b>Пр " + ex.pr + "</b>, <b>Ур " + ex.ur + "</b>, <b>Напр ОН " + ex.deltai + "</b>, <b>Расход 1</b>.",
        keys: "<b>Готово!</b> После доклада о разрыве переходи ко второй части обучения (ниже)."
      }
    ];

    $("learnPart1").innerHTML = buildAccordionHtml(part1Steps);
    attachAccordionEvents("learnPart1");

    const part2Calc = [
      {
        t: "Записываем наблюдение со знаками",
        f: "П (+), Л (−) | Перелёт (+), Недолёт (−)",
        b: "Если наблюдатель доложил «П 10 +200» — берём α = +10, ΔД = +200. Если «Л 23 −» — α = −23, а для вилки берём ΔД = −200 (или половину прошлой вилки).",
        keys: "<b>Правило:</b> Знак корректуры всегда противоположен отклонению разрыва!"
      },
      {
        t: "Корректура в направление (β)",
        f: "β = −α × " + ex.ku + (ex.opSide === "ОП справа" ? " − " : " + ") + "(ΔД ÷ 100) × " + parseMils(ex.shu),
        b: "Первое слагаемое: берём отклонение по направлению с обратным знаком и умножаем на <b>Ку</b>. Второе слагаемое: смещение из-за ПС! При <b>ОП справа</b> перелёт (+) даёт «−» (влево), при <b>ОП слева</b> перелёт (+) даёт «+» (вправо).",
        keys: "<b>Калькулятор (напр. П 10 +200):</b> <b>−10 × " + ex.ku + (ex.opSide === "ОП справа" ? " − " : " + ") + "(200 ÷ 100) × " + parseMils(ex.shu) + " =</b>. Округли до целых и запиши в Напр."
      },
      {
        t: "Корректура в дальность (ΔПр) и переход на поражение",
        f: "ΔПр = −ΔД ÷ " + ex.dxTys + " (тыс.)",
        b: "Делим смещение по дальности (с обратным знаком) на табличное <b>ΔХтыс = " + ex.dxTys + " м</b>. При захвате цели в узкую вилку (или накрытии) командуй веер <b>Iв = " + ex.iv + "</b> и переходи к стрельбе на поражение.",
        keys: "<b>Калькулятор:</b> <b>−200 ÷ " + ex.dxTys + " =</b> → округли до целых делений прицела."
      }
    ];

    const part2Prk = state.prkModel === "69" ? [
      {
        t: "Оцифровка ЛЕВОГО круга ПРК-69",
        f: "Красный → ПС (" + ex.ps + ") по Cosec | Дк → риска Д | Дцт → риска У",
        b: "1) Совмести красный указатель с ПС = " + ex.ps + " по внутренней шкале <b>Cosec</b> и напротив Дк = " + ex.dk + " м по внешней шкале чисел поставь карандашом риску <b>Д</b>. 2) Поверни круг, совместив <b>Д</b> с Дцт = " + ex.dct + " м, и против ПС по средней шкале <b>ctg</b> поставь риску <b>У</b>.",
        keys: "<b>Запомни:</b> Левый круг работает от боковых отклонений (Л/П)."
      },
      {
        t: "Оцифровка ПРАВОГО круга ПРК-69",
        f: "Красный → ПС (" + ex.ps + ") по Sec | 1 → риска Д | Дцт → риска У",
        b: "1) Совмести красный указатель с ПС = " + ex.ps + " по шкале <b>Sec</b> и напротив «1» по шкале чисел поставь риску <b>Д</b>. 2) Совмести <b>Д</b> с Дцт = " + ex.dct + " м и против ПС по шкале <b>tg</b> поставь риску <b>У</b>. В круглом окне выставь <b>" + ex.opSide + "</b>.",
        keys: "<b>Запомни:</b> Правый круг работает от знака дальности (+/−)."
      },
      {
        t: "Снятие корректур с обоих кругов",
        f: "Левый (Л/П) + Правый (+/−) = Итоговые ΔД и β",
        b: "Установи красные указатели на измеренные отклонения, прочти значения у рисок <b>Д</b> (дальность в м) и <b>У</b> (угломер в тыс.). Знаки «+»/«−» посмотри в двух квадратных окошках внизу планшета и сложи результаты.",
        keys: "<b>На калькуляторе в конце:</b> раздели итоговое ΔД на <b>ΔХтыс = " + ex.dxTys + "</b>, чтобы получить ΔПр."
      }
    ] : [
      {
        t: "Оцифровка линейки и круга ПРК-75",
        f: "Круг в 0 | На линейке Дк и Дцт | На круге риска ОП на ПС (" + ex.ps + ")",
        b: "Поставь поворотный круг в 0. На подвижной вертикальной линейке поставь карандашом риску <b>Дк (" + (ex.dk / 1000).toFixed(1) + " км)</b> и риску <b>Дцт (" + (ex.dct / 1000).toFixed(1) + " км)</b>. По нижней угломерной шкале отложи <b>ПС = " + ex.ps + "</b> (" + ex.opSide + ") и поставь на круге риску <b>ОП</b>.",
        keys: "<b>Контроль:</b> риска ОП показывает направление стрельбы батареи."
      },
      {
        t: "Нанесение точки разрыва Р1",
        f: "Сдвиг линейки (Л/П) + отметка у Дк / (±м)",
        b: "Сдвинь вертикальную линейку по верхней направляющей на боковое отклонение разрыва и поставь точку <b>Р1</b> на поворотном круге у риски Дк (или на +/− метров по шкале линейки).",
        keys: "<b>Важно:</b> перелёты (+) ставим выше центра, недолёты (−) — ниже центра."
      },
      {
        t: "Снятие ΔД и β с ПРК-75",
        f: "Риску ОП вверх на 0 → линейку к Р1 → читаем ΔД и β",
        b: "Поверни круг риской <b>ОП</b> вертикально вверх (на 0). Подведи подвижную линейку к точке <b>Р1</b>: по шкале линейки прочти корректуру дальности ΔД, а по угломерному графику под риской Дцт — корректуру направления β.",
        keys: "<b>Перевод в прицел:</b> ΔПр = ΔД ÷ " + ex.dxTys + " (тыс.)."
      }
    ];

    if (inp.fuzeMode === "dt" && c) {
      part2Calc.push({
        t: "Корректура высоты разрыва (ДТ / ПСиУО-2020)",
        f: "Mр = Mр.к × " + ex.ku + " | ΔУр = " + fmtMils(c.mOpt, false) + " − Mр",
        b: "При стрельбе с дистанционной трубкой переводим измеренную с КНП высоту разрыва Mр.к в тысячные от ОП (умножая на <b>Ку</b>). Оптимальная высота <b>" + c.hOpt + " м (" + fmtMils(c.mOpt, false) + ")</b>. При наземных разрывах («Удар») увеличиваем Уровень на +0-04 (или уменьшаем трубку на 2–4 дел.).",
        keys: "<b>1 тыс. Уровня</b> на вашей дальности меняет высоту разрыва на <b>" + c.mPerMil + " м</b>."
      });
    } else if (inp.fuzeMode === "rv") {
      part2Calc.push({
        t: "Переход на поражение с радиовзрывателем (РВ / ПСиУО-2020)",
        f: "Взр. АР-30 (В) | Высота 5–15 м авто",
        b: "Пристрелка по дальности и направлению ведётся как с обычным взрывателем (трубка и пристрелка высоты не нужны). При переходе на поражение переводят кран на <b>«В»</b> (воздушный), на настильных траекториях при необходимости добавляют +1…+2 тыс. в прицел.",
        keys: "<b>Важно:</b> не применять на рикошет, через густой лес и при сильных помехах РЭБ."
      });
    }
    const list2 = state.learnTool === "calc" ? part2Calc : part2Prk;
    $("learnPart2").innerHTML = buildAccordionHtml(list2);
    attachAccordionEvents("learnPart2");
  }

  // --- ГЕНЕРАТОР ЗАДАЧ (КНОПКА СОБ) И ХРАНЕНИЕ 5 ПОСЛЕДНИХ ---
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pickRandom(arr) {
    return arr[randInt(0, arr.length - 1)];
  }

  function loadGenHistory() {
    try {
      const raw = localStorage.getItem(getGenKey());
      state.genHistory = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(state.genHistory)) state.genHistory = [];
    } catch (e) {
      state.genHistory = [];
    }
    renderGenHistory();
  }

  function saveGenHistory() {
    try {
      localStorage.setItem(getGenKey(), JSON.stringify(state.genHistory.slice(0, 5)));
    } catch (e) {
      // ignore storage errors
    }
  }

  function pickChargeForDist(dist, mode, d30Mode) {
    if (mode === "2b11") {
      if (dist <= 1300) return "1";
      if (dist <= 2200) return "2";
      if (dist <= 3100) return "3";
      if (dist <= 4000) return "4";
      if (dist <= 4800) return "5";
      if (dist <= 5600) return "6";
      return "long";
    }
    if (d30Mode === "mort") {
      if (dist <= 6200) return "4";
      if (dist <= 8000) return "3";
      if (dist <= 9600) return "2";
      if (dist <= 11200) return "1";
      if (dist <= 12400) return "reduced";
      return "full";
    }
    if (d30Mode === "rik") {
      if (dist <= 4200) return "4";
      if (dist <= 5400) return "3";
      if (dist <= 6000) return "2";
      if (dist <= 6600) return "1";
      if (dist <= 7400) return "reduced";
      return "full";
    }
    if (dist <= 5200) return "4";
    if (dist <= 7400) return "3";
    if (dist <= 9000) return "2";
    if (dist <= 10600) return "1";
    if (dist <= 12200) return "reduced";
    return "full";
  }

  function buildScenarioSteps(corrMode) {
    const steps = [];
    const adjCount = randInt(2, 3);
    const firstSign = pickRandom(["+", "-"]);
    const oppSign = firstSign === "+" ? "-" : "+";
    const preobMeta = [
      { key: "preob_plus", label: "Преобл. «+» отн. ДГЦ" },
      { key: "preob_minus", label: "Преобл. «−» отн. БГЦ" },
      { key: "equal", label: "Равенство + и −" },
      { key: "only_plus", label: "Только «+»" },
      { key: "only_minus", label: "Только «–»" }
    ];

    if (corrMode === "pkss") {
      for (let i = 0; i < adjCount; i++) {
        const ns = pickRandom(["N", "S"]);
        const ew = pickRandom(["E", "W"]);
        const maxM = i === 0 ? 170 : (i === 1 ? 90 : 45);
        const minM = i === 0 ? 70 : (i === 1 ? 35 : 15);
        const nsVal = randInt(minM, maxM);
        const ewVal = randInt(minM, maxM);
        steps.push({
          stage: "Пристрелка",
          kind: "pkss_adj",
          nsDir: ns,
          nsVal: nsVal,
          ewDir: ew,
          ewVal: ewVal,
          text: (ns === "N" ? "С " : "Ю ") + nsVal + ", " + (ew === "E" ? "В " : "З ") + ewVal
        });
      }
      const ffeNs = pickRandom(["N", "S"]);
      const ffeEw = pickRandom(["E", "W"]);
      const ffeNsVal = randInt(10, 25);
      const ffeEwVal = randInt(10, 25);
      steps.push({
        stage: "На поражение",
        kind: "pkss_ffe",
        nsDir: ffeNs,
        nsVal: ffeNsVal,
        ewDir: ffeEw,
        ewVal: ffeEwVal,
        text: (ffeNs === "N" ? "С " : "Ю ") + ffeNsVal + ", " + (ffeEw === "E" ? "В " : "З ") + ffeEwVal + " → переход"
      });
      const pItem = pickRandom(preobMeta);
      const sSide = pickRandom(["L", "R"]);
      const sVal = randInt(3, 18);
      steps.push({
        stage: "Серия (пораж.)",
        kind: "series",
        seriesMode: pItem.key,
        side: sSide,
        dirVal: sVal,
        text: pItem.label + " (" + (sSide === "L" ? "Л " : "П ") + fmtMils(sVal, false) + ")"
      });
    } else {
      for (let i = 0; i < adjCount; i++) {
        const side = pickRandom(["L", "R"]);
        const maxDir = i === 0 ? 85 : (i === 1 ? 45 : 22);
        const minDir = i === 0 ? 25 : (i === 1 ? 10 : 4);
        const dirVal = randInt(minDir, maxDir);
        const dirStr = fmtMils(dirVal, false);
        let rSign = firstSign;
        if (i === adjCount - 1) {
          rSign = oppSign;
        } else if (i === 1 && adjCount === 3) {
          rSign = pickRandom([firstSign, firstSign, oppSign]);
        }
        steps.push({
          stage: "Пристрелка",
          kind: "pnzr_adj",
          side: side,
          dirVal: dirVal,
          rSign: rSign,
          text: (side === "L" ? "Л " : "П ") + dirStr + " " + rSign
        });
      }
      const isHit = Math.random() < 0.5;
      const ffeSide = isHit ? "0" : pickRandom(["L", "R"]);
      const ffeDir = isHit ? 0 : randInt(2, 8);
      steps.push({
        stage: "На поражение",
        kind: "pnzr_ffe",
        side: ffeSide,
        dirVal: ffeDir,
        rSign: "target",
        text: isHit ? "Цель / Накрытие" : ((ffeSide === "L" ? "Л " : "П ") + fmtMils(ffeDir, false) + " (переход)")
      });
      const pItem = pickRandom(preobMeta);
      const bSide = pickRandom(["L", "R"]);
      const bVal = randInt(3, 18);
      steps.push({
        stage: "Серия (пораж.)",
        kind: "series",
        seriesMode: pItem.key,
        side: bSide,
        dirVal: bVal,
        text: pItem.label + " (" + (bSide === "L" ? "Л " : "П ") + fmtMils(bVal, false) + ")"
      });
    }
    return steps;
  }

  function renderScenarioViews() {
    const box = $("genScenarioBox");
    const banner = $("tableScenarioBanner");
    const sc = state.activeScenario;
    if (!sc || !Array.isArray(sc.steps) || sc.steps.length === 0) {
      if (box) box.classList.add("hidden");
      if (banner) banner.classList.add("hidden");
      return;
    }
    const modeLabel = sc.corrMode === "pkss" ? "ПКСС" : "ПНЗР";
    const rowsHtml = sc.steps.map(function (st, idx) {
      return (
        '<div class="gen-step-row">' +
        '<span class="gen-step-tag">' + (idx + 1) + '. ' + escapeHtml(st.stage) + '</span>' +
        '<span class="mono">' + escapeHtml(st.text) + '</span>' +
        '</div>'
      );
    }).join("");

    if (box) {
      box.innerHTML =
        '<div class="gen-scenario-title"><span>Вводные по разрывам (' + modeLabel + ', ' + sc.steps.length + ' шагов)</span></div>' +
        '<div class="gen-scenario-steps">' + rowsHtml + '</div>';
      box.classList.remove("hidden");
    }
    if (banner) {
      banner.innerHTML =
        '<div class="gen-scenario-title">' +
        '<span>Вводные задачи (' + modeLabel + ')</span>' +
        '<button class="btn btn-ghost btn-xs" id="btnHideTableScenario" type="button">✕</button>' +
        '</div>' +
        '<div class="gen-scenario-steps">' + rowsHtml + '</div>';
      banner.classList.remove("hidden");
      const hideBtn = $("btnHideTableScenario");
      if (hideBtn) {
        hideBtn.addEventListener("click", function () {
          banner.classList.add("hidden");
        });
      }
    }
  }

  function generateRandomTask() {
    const knpCallsigns = ["Кама", "Волга", "Ока", "Сокол", "Беркут", "Гранит"];
    const opCallsigns = ["Вишня", "Акация", "Клён", "Ясень", "Тополь", "Берёза"];
    const cmdCallsigns = ["Дон", "Урал", "Амур", "Енисей", "Днепр"];
    const goalTypes = [
      "пехота на занятой позиции",
      "взводный опорный пункт",
      "миномётная батарея",
      "взвод самоходный",
      "наблюдательный пункт",
      "противотанковое орудие"
    ];

    const knpX = randInt(82000, 98000);
    const knpY = randInt(28000, 48000);
    const knpH = randInt(80, 180);

    const is2b11 = state.appMode === "2b11";
    let d30Mode = "nast";
    if (!is2b11) {
      d30Mode = state.genD30FireMode === "random" ? pickRandom(["nast", "rik", "mort"]) : state.genD30FireMode;
    }
    const minValidD = is2b11 ? 900 : (d30Mode === "mort" ? 4500 : 3200);
    const maxValidD = is2b11 ? 6500 : (d30Mode === "rik" ? 8200 : 14200);

    let opX, opY, dk, ak, xt, yt, dct;
    for (let attempt = 0; attempt < 40; attempt++) {
      const opAngle = Math.random() * 2 * Math.PI;
      const opDist = is2b11 ? randInt(800, 2600) : (d30Mode === "mort" ? randInt(3800, 9200) : randInt(2400, 6800));
      opX = Math.round(knpX + opDist * Math.cos(opAngle));
      opY = Math.round(knpY + opDist * Math.sin(opAngle));
      dk = is2b11 ? randInt(700, 2400) : randInt(1600, 3400);
      ak = randInt(0, 5999);
      const akRad = milsToRad(ak);
      xt = knpX + dk * Math.cos(akRad);
      yt = knpY + dk * Math.sin(akRad);
      dct = Math.hypot(xt - opX, yt - opY);
      if (dct >= minValidD && dct <= maxValidD) break;
    }
    const opH = Math.max(50, knpH + randInt(-35, 35));
    const act = radToMils(Math.atan2(yt - opY, xt - opX));
    const on = norm6000(act + randInt(-400, 400));
    const charge = pickChargeForDist(dct, state.appMode, d30Mode);
    const corrMode = state.genCorrMode || "pnzr";
    const scenarioSteps = buildScenarioSteps(corrMode);
    const item = {
      id: Date.now(),
      timeStr: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      dct: Math.round(dct),
      corrMode: corrMode,
      scenarioSteps: scenarioSteps,
      task: {
        systemKey: is2b11 ? "2b11" : "d30",
        systemName: is2b11 ? "120-мм миномёт 2Б11" : "122-мм Г Д-30",
        charge: charge,
        d30Mode: d30Mode,
        guns: pickRandom([4, 6]),
        callKnp: pickRandom(knpCallsigns),
        callOp: pickRandom(opCallsigns),
        callCmd: pickRandom(cmdCallsigns),
        knpX: knpX,
        knpY: knpY,
        knpH: knpH,
        opX: opX,
        opY: opY,
        opH: opH,
        goalNum: String(randInt(101, 149)),
        goalType: pickRandom(goalTypes),
        taskType: pickRandom(["Подавить", "Уничтожить"]),
        dk: dk,
        ak: fmtMils(ak, false),
        on: fmtMils(on, false),
        mk: randInt(-15, 15),
        fcRaw: fmtMils(randInt(20, 80), false),
        gc: randInt(80, 200),
        fb: 70,
        ddCis: randInt(-180, 180),
        ddeltaCis: fmtMils(randInt(-35, 35), true),
        startPr: 0,
        useDeriv: !is2b11
      }
    };

    state.genHistory.unshift(item);
    state.genHistory = state.genHistory.slice(0, 5);
    saveGenHistory();
    renderGenHistory();
    openGeneratedTaskPreview(item);
  }

  function setConditionCollapsed(collapsed) {
    state.genConditionCollapsed = !!collapsed;
    const body = $("genConditionBody");
    const btn = $("btnToggleGenCondition");
    if (body) body.classList.toggle("collapsed", state.genConditionCollapsed);
    if (btn) btn.textContent = state.genConditionCollapsed ? "Развернуть" : "Свернуть";
  }

  function openGeneratedTaskPreview(item) {
    state.currentGenItem = item;
    const t = item.task;
    const chDict = t.systemKey === "2b11" ? TS_2B11 : TS_D30;
    const chLabel = chDict[t.charge] ? chDict[t.charge].label : t.charge;
    const modeLabel = item.corrMode === "pkss" ? "ПКСС (С/Ю, В/З)" : "ПНЗР (Л/П, +/-)";

    $("genPreviewTitle").textContent = "Задача: Цель " + t.goalNum + " (" + t.goalType + ")";
    $("genInputsGrid").innerHTML = [
      ["Система / Заряд", t.systemName + " • " + chLabel + (t.systemKey !== "2b11" ? (" • " + (t.d30Mode === "mort" ? "Мортирная" : (t.d30Mode === "rik" ? "Рикошет" : "Настильная"))) : "")],
      ["Позывные / Орудий", t.callKnp + " / " + t.callOp + " / " + t.callCmd + " (" + t.guns + " ор.)"],
      ["КНП (X / Y / h)", t.knpX + " / " + t.knpY + " / " + t.knpH + " м"],
      ["ОП (X / Y / h)", t.opX + " / " + t.opY + " / " + t.opH + " м"],
      ["Дк / αк / Mк", t.dk + " м / " + t.ak + " / " + t.mk],
      ["ОН / Задача", t.on + " / " + t.taskType],
      ["Фц / Гц / Фб", t.fcRaw + " / " + t.gc + " м / " + t.fb + " м"],
      ["Поправки / Режим", "ΔД=" + t.ddCis + " м, Δδ=" + t.ddeltaCis + " • " + modeLabel]
    ].map(function (pair) {
      return '<div class="kv-item"><span class="kv-label">' + pair[0] + '</span><span class="kv-val mono">' + escapeHtml(String(pair[1])) + '</span></div>';
    }).join("");

    state.activeScenario = item.scenarioSteps ? { corrMode: item.corrMode || "pnzr", steps: item.scenarioSteps } : null;
    renderScenarioViews();
    setConditionCollapsed(false);
    $("genTaskPreviewCard").classList.remove("hidden");
    $("genSolutionCard").classList.add("hidden");
    showToast("Условие задачи сформировано — нажмите «Рассчитать»");
  }

  function loadItemToInputs(item) {
    const t = item.task;
    $("inSystem").value = t.systemKey;
    syncChargeOptions(t.systemKey === "2b11");
    $("inCharge").value = t.charge;
    if ($("inD30Mode")) $("inD30Mode").value = t.d30Mode || "nast";
    $("inGuns").value = t.guns;
    $("inCallKnp").value = t.callKnp;
    $("inCallOp").value = t.callOp;
    $("inCallCmd").value = t.callCmd;
    $("inKnpX").value = t.knpX;
    $("inKnpY").value = t.knpY;
    $("inKnpH").value = t.knpH;
    $("inOpX").value = t.opX;
    $("inOpY").value = t.opY;
    $("inOpH").value = t.opH;
    $("inGoalNum").value = t.goalNum;
    $("inGoalType").value = t.goalType;
    $("inTaskType").value = t.taskType;
    if ($("inTargetInputMode")) { $("inTargetInputMode").value = "polar"; syncTargetInputModeUI(); }
    $("inDk").value = t.dk;
    $("inAk").value = t.ak;
    $("inOn").value = t.on;
    $("inBaseUglom").value = "";
    $("inMk").value = t.mk;
    $("inFc").value = t.fcRaw;
    $("inGc").value = t.gc;
    $("inFb").value = t.fb;
    $("inDdCis").value = t.ddCis;
    $("inDdeltaCis").value = t.ddeltaCis;
    $("inStartPr").value = t.startPr > 0 ? t.startPr : "";
    $("inUseDeriv").checked = !!t.useDeriv;
  }

  function computeBurstMath(step, c, inp, forkStep) {
    const dxTys = Math.max(0.1, inp.dxTys || 10);
    const useExact = Math.abs(c.ps) >= 500;
    const gcVal = inp.gc !== null ? inp.gc : 100;
    const vdVal = state.tsData ? state.tsData.vd : 25;

    if (step.kind === "pkss_adj" || step.kind === "pkss_ffe") {
      const dxGeo = -(step.nsDir === "N" ? step.nsVal : -step.nsVal);
      const dyGeo = -(step.ewDir === "E" ? step.ewVal : -step.ewVal);
      const dRange = dxGeo * Math.cos(c.actRad) + dyGeo * Math.sin(c.actRad);
      const dSide = -dxGeo * Math.sin(c.actRad) + dyGeo * Math.cos(c.actRad);
      return {
        obsText: (step.kind === "pkss_adj" ? "Разрыв: " : "Разрыв: ") + (step.nsDir === "N" ? "С " : "Ю ") + step.nsVal + ", " + (step.ewDir === "E" ? "В " : "З ") + step.ewVal,
        dPr: Math.round(((inp.systemKey !== "2b11" && inp.d30Mode === "mort") ? -1 : 1) * (dRange / dxTys)),
        beta: c.dct > 0 ? Math.round(dSide / (0.001 * c.dct)) : 0
      };
    }

    const side = step.side || "0";
    const rawDir = step.dirVal || 0;
    const alphaObs = side === "L" ? -Math.abs(rawDir) : (side === "R" ? Math.abs(rawDir) : 0);
    let deltaD = 0;

    if (step.kind === "series") {
      const stepPreob = gcVal < 100 ? vdVal : c.skMeters;
      const stepOnly = gcVal < 100 ? (2 * vdVal) : Math.round(c.skMeters * 1.5);
      if (step.seriesMode === "preob_plus") deltaD = stepPreob;
      else if (step.seriesMode === "preob_minus") deltaD = -stepPreob;
      else if (step.seriesMode === "only_plus") deltaD = stepOnly;
      else if (step.seriesMode === "only_minus") deltaD = -stepOnly;
      else deltaD = 0;
    } else if (step.rSign === "+") {
      deltaD = forkStep;
    } else if (step.rSign === "-") {
      deltaD = -forkStep;
    } else {
      deltaD = 0;
    }

    let dPr = 0;
    let beta = 0;
    if (useExact && inp.knpX !== null && inp.opX !== null) {
      const akRadR = milsToRad(norm6000(inp.ak + alphaObs));
      const dkR = (inp.dk || 0) + deltaD;
      const xr = inp.knpX + dkR * Math.cos(akRadR);
      const yr = inp.knpY + dkR * Math.sin(akRadR);
      const drOp = Math.hypot(xr - inp.opX, yr - inp.opY);
      const arOp = radToMils(Math.atan2(yr - inp.opY, xr - inp.opX));
      const mortSign = (inp.systemKey !== "2b11" && inp.d30Mode === "mort") ? -1 : 1;
      dPr = Math.round(mortSign * (-(drOp - c.dct) / dxTys));
      beta = -normDelta(arOp - c.act);
    } else {
      const opRightSign = c.ps >= 0 ? -1 : 1;
      const mortSign = (inp.systemKey !== "2b11" && inp.d30Mode === "mort") ? -1 : 1;
      beta = Math.round(-alphaObs * c.ku + opRightSign * (deltaD / 100) * c.shu);
      dPr = Math.round(mortSign * (-deltaD / dxTys));
    }

    return {
      obsText: step.text,
      dPr: dPr,
      beta: beta
    };
  }

  function solveGeneratedTask() {
    const item = state.currentGenItem;
    if (!item) return;

    loadItemToInputs(item);
    readSetupInputs();
    computeAll();

    const c = state.calc;
    const inp = state.inputs;
    const ts = state.tsData;
    const autoTable = $("genAutoBuildTable") && $("genAutoBuildTable").checked;

    const dxStep = Math.max(1, inp.dxTys || 10);
    const evenStep = 2 * dxStep;
    let forkStep = ts ? Math.max(evenStep, Math.round((8 * ts.vd) / evenStep) * evenStep) : 200;

    const ammoW = isMortarMode() ? "Мина" : "Сн.";
    const shotW = isMortarMode() ? "мину" : "снаряд";
    const adjCmdW = isMortarMode() ? "Осн. 1 мин. Ог." : "Осн. 1 сн. Ог.";
    const ffeShotW = isMortarMode() ? " мин. бег. Ог." : " сн. бег. Ог.";
    const fuzeW = (!isMortarMode() && inp.d30Mode === "rik") ? "З" : "О";
    const modeW = (!isMortarMode() && inp.d30Mode === "mort") ? " Мортирная." : ((!isMortarMode() && inp.d30Mode === "rik") ? " На рикошет." : "");
    const cmd1Text =
      "«" + inp.callKnp + "». Стой. Цель " + inp.goalNum + "-я, " +
      inp.goalType + ". " + inp.taskType + ". " + ammoW + " «ОФ». Взр. «" + fuzeW + "». Зар. " +
      (ts ? ts.cmdLabel : inp.charge) + "." + modeW + " Шк. Тыс. Основному 1 " + shotW + ". Огонь.";

    if (autoTable && c) {
      const rows = [{
        num: 1,
        cmd: cmd1Text,
        pr: String(c.effectivePr),
        ur: fmtMils(c.ur, false),
        napr: "ОН " + fmtMils(c.deltai, true),
        obs: "",
        rashod: 1
      }];
      let curPr = c.effectivePr;
      let curNapr = c.deltai;
      let totalRashod = 1;
      let seenP = false;
      let seenM = false;
      const gcVal = inp.gc !== null ? inp.gc : 100;
      const numUstRange = gcVal < 100 ? 1 : 3;
      const numUstDir = c.useTwoUglom ? 2 : 1;
      const ivText = c.fcMeters <= 50 ? "Сосредоточенный. " : (c.iv > 0 ? ("Iв " + fmtMils(c.iv, false) + ". ") : "Веер параллельный. ");
      const ugText = c.useTwoUglom ? ("Углом. 2 (±" + fmtMils(c.uglomShift, false) + "). ") : "";
      const ffeCmd = gcVal < 100
        ? ("Батарее. " + ivText + ugText + "по 2" + ffeShotW)
        : ("Батарее. " + ivText + ugText + "Уст 2. Ск. " + c.skTys + ". по 2" + ffeShotW);
      const ffeShots = inp.guns * 2 * numUstRange * numUstDir;

      const steps = item.scenarioSteps || [];
      steps.forEach(function (st) {
        if (st.kind === "pnzr_adj" || st.kind === "pkss_adj") {
          if (st.kind === "pnzr_adj") {
            if (st.rSign === "+") seenP = true;
            if (st.rSign === "-") seenM = true;
            if (seenP && seenM) {
              forkStep = Math.max(evenStep, Math.round(forkStep / 2));
            }
          }
          const res = computeBurstMath(st, c, inp, forkStep);
          rows[rows.length - 1].obs = res.obsText;
          curPr += res.dPr;
          curNapr += res.beta;
          totalRashod += 1;
          rows.push({
            num: rows.length + 1,
            cmd: adjCmdW,
            pr: res.dPr > 0 ? "+" + res.dPr : String(res.dPr),
            ur: "",
            napr: fmtMils(res.beta, true),
            obs: "",
            rashod: 1,
            dPr: res.dPr,
            beta: res.beta,
            fireMode: "adjust",
            obsSign: st.rSign || ""
          });
        } else if (st.kind === "pnzr_ffe" || st.kind === "pkss_ffe") {
          if (st.kind === "pnzr_ffe") {
            if (st.rSign === "+") seenP = true;
            if (st.rSign === "-") seenM = true;
            if (seenP && seenM) {
              forkStep = Math.max(evenStep, Math.round(forkStep / 2));
            }
          }
          const res = computeBurstMath(st, c, inp, forkStep);
          rows[rows.length - 1].obs = res.obsText;
          rows[rows.length - 1].obsReady = true;
          curPr += res.dPr;
          curNapr += res.beta;
          totalRashod += ffeShots;
          rows.push({
            num: rows.length + 1,
            cmd: ffeCmd,
            pr: String(curPr),
            ur: "",
            napr: fmtMils(curNapr, true),
            obs: "",
            rashod: ffeShots,
            dPr: res.dPr,
            beta: res.beta,
            fireMode: "battery"
          });
        } else if (st.kind === "series") {
          const res = computeBurstMath(st, c, inp, forkStep);
          rows[rows.length - 1].obs = res.obsText;
          curPr += res.dPr;
          curNapr += res.beta;
          rows.push({
            num: rows.length + 1,
            cmd: "«" + inp.callKnp + "», Стой. Записать. Цель " + inp.goalNum + "-я, " + inp.goalType + ". Расход " + totalRashod + ".",
            pr: String(curPr),
            ur: fmtMils(c.ur, false),
            napr: fmtMils(curNapr, true),
            obs: "Корр. по серии: ΔПр " + (res.dPr > 0 ? "+" + res.dPr : res.dPr) + ", β " + fmtMils(res.beta, true),
            rashod: totalRashod,
            isSummaryRow: true
          });
        }
      });

      state.rows = rows;
      state.currentPr = curPr;
      state.currentUr = c.ur;
      state.currentNapr = curNapr;
      state.totalRashod = totalRashod;
      state.seenPlus = seenP;
      state.seenMinus = seenM;
      state.readyForEffect = false;
      state.ffeActive = true;
      $("bForkStep").value = String(forkStep);
    } else {
      state.rows = [];
      state.totalRashod = 0;
      state.seenPlus = false;
      state.seenMinus = false;
      state.readyForEffect = false;
      state.ffeActive = false;
      $("bForkStep").value = String(forkStep);
    }

    saveWorkState();
    renderTable();
    renderPrkPanel();
    renderLearnPanel();

    if (c) {
      $("genSolutionGrid").innerHTML = [
        ["Цель (Xц / Yц / hц)", c.xt + " / " + c.yt + " / " + c.ht + " м"],
        ["Дцт / αцт / δцт", c.dct + " м / " + fmtMils(c.act, false) + " / " + fmtMils(c.deltact, true)],
        ["Ди / δи", c.di + " м / " + fmtMils(c.deltai, true)],
        ["Ур / Пр (" + (isMortarMode() ? "ТС 2Б11" : "ТС №145") + ")", fmtMils(c.ur, false) + " / " + c.effectivePr + " (ΔХтыс=" + inp.dxTys + "м, Вд=" + (ts ? ts.vd : "—") + "м)"],
        ["Ку / ПС / Шу", c.ku.toFixed(1) + " / " + fmtMils(Math.abs(c.ps), false) + " (" + c.opSide + ") / " + fmtMils(c.shu, false)],
        ["Ск / Iв", (inp.gc !== null ? c.skMeters + "м (" + c.skTys + " тыс.)" : "—") + " / " + fmtMils(c.iv, false) + (c.useTwoUglom ? " (Углом. 2)" : "")]
      ].map(function (pair) {
        return '<div class="kv-item"><span class="kv-label">' + pair[0] + '</span><span class="kv-val mono">' + escapeHtml(String(pair[1])) + '</span></div>';
      }).join("");
    }

    if (autoTable && state.rows.length > 0) {
      $("genSolutionTableWrap").innerHTML =
        '<table class="fire-table"><thead><tr><th>№</th><th>Команда</th><th>Пр</th><th>Ур</th><th>Напр</th><th>Наблюдения</th><th>Расход</th></tr></thead><tbody>' +
        state.rows.map(function (r) {
          return "<tr><td>" + r.num + "</td><td>" + escapeHtml(r.cmd) + "</td><td>" + escapeHtml(r.pr) + "</td><td>" + escapeHtml(r.ur) + "</td><td>" + escapeHtml(r.napr) + "</td><td>" + escapeHtml(r.obs) + "</td><td>" + escapeHtml(String(r.rashod)) + "</td></tr>";
        }).join("") +
        '</tbody></table>';
    } else {
      $("genSolutionTableWrap").innerHTML =
        '<p class="muted-note">Автосоставление таблицы отключено галочкой. Расчёты загружены — перейдите в «Расчёт» или «Таблица», чтобы вести пристрелку вручную по вводным.</p>';
    }

    setConditionCollapsed(true);
    $("genSolutionCard").classList.remove("hidden");
    showToast(autoTable ? "Задача рассчитана и таблица составлена" : "Расчёты выполнены");
  }

  function renderGenHistory() {
    const list = $("genHistoryList");
    $("genCountPill").textContent = state.genHistory.length + " / 5";
    if (state.genHistory.length === 0) {
      list.innerHTML = '<div class="empty-gen">Пока нет сохранённых генераций. Нажмите «Сгенерировать новую задачу».</div>';
      return;
    }

    list.innerHTML = state.genHistory
      .map(function (item, idx) {
        const t = item.task;
        const chDict = t.systemKey === "2b11" ? TS_2B11 : TS_D30;
        const chLabel = chDict[t.charge] ? chDict[t.charge].cmdLabel : t.charge;
        return (
          '<div class="gen-item">' +
          '<div class="gen-item-info">' +
          '<div class="gen-item-title">#' + (idx + 1) + ' • Цель ' + escapeHtml(t.goalNum) + ' (' + escapeHtml(t.goalType) + ')</div>' +
          '<div class="gen-item-sub mono">Дк=' + t.dk + 'м • Дцт≈' + item.dct + 'м • Зар. ' + chLabel + ' • ' + (item.corrMode === "pkss" ? "ПКСС" : "ПНЗР") + (item.scenarioSteps ? (" (" + item.scenarioSteps.length + " вводн.)") : "") + ' • ' + item.timeStr + '</div>' +
          '</div>' +
          '<button class="btn btn-accent btn-sm" data-gen-idx="' + idx + '" type="button">Загрузить</button>' +
          '</div>'
        );
      })
      .join("");

    list.querySelectorAll("[data-gen-idx]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const idx = parseInt(btn.getAttribute("data-gen-idx"), 10);
        if (state.genHistory[idx]) {
          openGeneratedTaskPreview(state.genHistory[idx]);
        }
      });
    });
  }

  function switchTab(tabName) {
    state.activeTab = tabName;
    document.querySelectorAll(".tab-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-tab") === tabName);
    });
    document.querySelectorAll(".tab-panel").forEach(function (p) {
      p.classList.toggle("active", p.id === "panel-" + tabName);
    });
    $("btnSobBadge").classList.toggle("active", tabName === "gen");
  }

  function openModal(id) {
    $(id).classList.add("open");
    $(id).setAttribute("aria-hidden", "false");
  }

  function closeModal(id) {
    $(id).classList.remove("open");
    $(id).setAttribute("aria-hidden", "true");
  }

  function numOrNull(id) {
    const v = $(id).value.trim();
    if (v === "") return null;
    const n = parseFloat(v.replace(",", "."));
    return Number.isFinite(n) ? n : null;
  }

  function readSetupInputs() {
    const sel = $("inSystem");
    const opt = sel.options[sel.selectedIndex];
    const sysKey = sel.value;
    state.inputs = {
      systemKey: sysKey,
      systemName: opt ? opt.getAttribute("data-name") : "Орудие",
      charge: $("inCharge").value,
      d30Mode: $("inD30Mode") ? $("inD30Mode").value : "nast",
      fuzeMode: $("inFuzeMode") ? $("inFuzeMode").value : "impact",
      trStart: $("inTrStart") ? $("inTrStart").value.trim() : "",
      hOpt: numOrNull("inHopt") || 15,
      dxTys: parseFloat($("inDxTys").value) || 7,
      guns: parseInt($("inGuns").value, 10) || 4,
      callKnp: $("inCallKnp").value.trim() || "КНП",
      callOp: $("inCallOp").value.trim() || "ОП",
      callCmd: $("inCallCmd").value.trim() || "Старший",
      knpX: numOrNull("inKnpX"),
      knpY: numOrNull("inKnpY"),
      knpH: numOrNull("inKnpH"),
      opX: numOrNull("inOpX"),
      opY: numOrNull("inOpY"),
      opH: numOrNull("inOpH"),
      targetInputMode: $("inTargetInputMode") ? $("inTargetInputMode").value : "polar",
      targetX: numOrNull("inTargetX"),
      targetY: numOrNull("inTargetY"),
      targetH: numOrNull("inTargetH"),
      goalNum: $("inGoalNum").value.trim() || "—",
      goalType: $("inGoalType").value.trim() || "цель",
      taskType: $("inTaskType").value.trim() || "Подавить",
      dk: numOrNull("inDk"),
      ak: $("inAk").value.trim() ? parseMils($("inAk").value) : null,
      on: $("inOn").value.trim() ? parseMils($("inOn").value) : null,
      baseUglom: $("inBaseUglom").value.trim() ? parseMils($("inBaseUglom").value) : null,
      mk: numOrNull("inMk") || 0,
      fcRaw: $("inFc").value.trim(),
      gc: numOrNull("inGc"),
      fb: numOrNull("inFb") || 0,
      ddCis: numOrNull("inDdCis") || 0,
      ddeltaCis: $("inDdeltaCis").value.trim() ? parseMils($("inDdeltaCis").value) : 0,
      startPr: parseInt($("inStartPr").value, 10) || 0,
      useDeriv: $("inUseDeriv").checked
    };
  }

  function syncTargetInputModeUI() {
    const isRect = $("inTargetInputMode") && $("inTargetInputMode").value === "rect";
    if ($("targetRectRow")) $("targetRectRow").classList.toggle("hidden", !isRect);
    ["inDk", "inAk", "inMk"].forEach(function (id) {
      const el = $(id);
      if (el && el.closest(".field")) el.closest(".field").classList.toggle("hidden", isRect);
    });
  }

  function loadPreset(name) {
    if ($("inTargetInputMode")) { $("inTargetInputMode").value = "polar"; syncTargetInputModeUI(); }
    if (name === "variant3") {
      $("inSystem").value = "d30";
      syncChargeOptions(false);
      $("inCharge").value = "2";
      $("inGuns").value = 4;
      $("inCallKnp").value = "Кама";
      $("inCallOp").value = "Вишня";
      $("inCallCmd").value = "Дон";
      $("inKnpX").value = 95916;
      $("inKnpY").value = 39161;
      $("inKnpH").value = 95;
      $("inOpX").value = 95365;
      $("inOpY").value = 42173;
      $("inOpH").value = 125;
      $("inGoalNum").value = "103";
      $("inGoalType").value = "пехота на занятой позиции";
      $("inTaskType").value = "Подавить";
      $("inDk").value = 2660;
      $("inAk").value = "33-98";
      $("inOn").value = "41-00";
      $("inMk").value = 0;
      $("inFc").value = "0-40";
      $("inGc").value = 120;
      $("inFb").value = 70;
      $("inDdCis").value = -122;
      $("inDdeltaCis").value = "+0-27";
      $("inStartPr").value = 0;
      $("inUseDeriv").checked = false;
    } else {
      $("inSystem").value = "d30";
      syncChargeOptions(false);
      $("inCharge").value = "3";
      $("inGuns").value = 4;
      $("inCallKnp").value = "Кама";
      $("inCallOp").value = "Вишня";
      $("inCallCmd").value = "Урал";
      $("inKnpX").value = 95916;
      $("inKnpY").value = 39161;
      $("inKnpH").value = 100;
      $("inOpX").value = 95365;
      $("inOpY").value = 42173;
      $("inOpH").value = 100;
      $("inGoalNum").value = "101";
      $("inGoalType").value = "взвод самоходный";
      $("inTaskType").value = "Подавить";
      $("inDk").value = 1250;
      $("inAk").value = "47-30";
      $("inOn").value = "46-11";
      $("inMk").value = 0;
      $("inFc").value = "200";
      $("inGc").value = 200;
      $("inFb").value = 70;
      $("inDdCis").value = 0;
      $("inDdeltaCis").value = "0-00";
      $("inStartPr").value = 0;
      $("inUseDeriv").checked = false;
    }
    state.activeScenario = null;
    state.currentGenItem = null;
    renderScenarioViews();
    readSetupInputs();
    computeAll();
    saveWorkState();
    showToast("Пример загружен (ТС Д-30)");
  }

  // --- ЭКСПОРТ (PDF / WORD / EXCEL / HTML / TXT / JSON) И МАССОВЫЙ ГЕНЕРАТОР ---
  const EXPORT_INLINE_CSS =
    "body{font-family:'Times New Roman',Georgia,serif;color:#000;background:#fff;margin:14mm;font-size:11pt;line-height:1.35;}" +
    ".p-doc-title{font-size:15pt;font-weight:700;text-align:center;margin:0 0 6pt;}" +
    ".p-doc-sub{font-size:10pt;text-align:center;color:#333;margin:0 0 12pt;}" +
    ".p-h2{font-size:12.5pt;font-weight:700;margin:10pt 0 5pt;border-bottom:1pt solid #000;padding-bottom:2pt;}" +
    ".p-grid,.p-table{width:100%;border-collapse:collapse;margin:5pt 0 8pt;font-size:9.5pt;}" +
    ".p-grid td,.p-grid th,.p-table td,.p-table th{border:1px solid #222;padding:4pt 5pt;text-align:left;vertical-align:top;}" +
    ".p-grid th,.p-table th{background:#efefef;font-weight:700;}" +
    ".p-steps{margin:4pt 0 8pt;padding-left:18pt;}" +
    ".p-variant{page-break-after:always;break-after:page;}" +
    ".p-variant:last-child{page-break-after:auto;break-after:auto;}" +
    ".no-print{margin-bottom:12pt;padding:8pt;background:#f3f4f6;border:1px solid #ccc;text-align:center;}" +
    "@media print{.no-print{display:none!important;}body{margin:10mm;}}";

  function downloadFile(filename, content, mimeType) {
    if (window.AndroidBridge && typeof window.AndroidBridge.saveFile === "function") {
      window.AndroidBridge.saveFile(filename, content, mimeType.split(";")[0]);
      return;
    }
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 400);
    } catch (e) {
      showToast("Ошибка сохранения файла");
    }
  }

  function wrapStandaloneHtml(title, bodyHtml, withPrintBtn) {
    const bar = withPrintBtn
      ? '<div class="no-print"><button onclick="window.print()" style="padding:6pt 14pt;font-size:11pt;cursor:pointer;">Печать / Сохранить в PDF</button></div>'
      : "";
    return "<!DOCTYPE html><html lang='ru'><head><meta charset='UTF-8'><title>" + escapeHtml(title) +
      "</title><style>" + EXPORT_INLINE_CSS + "</style></head><body>" + bar + bodyHtml + "</body></html>";
  }

  function wrapWordDoc(title, bodyHtml) {
    return "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='UTF-8'><title>" + escapeHtml(title) + "</title><style>" + EXPORT_INLINE_CSS + "</style></head><body>" + bodyHtml + "</body></html>";
  }

  function printHtmlDocument(title, bodyHtml) {
    const area = $("printArea");
    if (!area) return;
    area.innerHTML = bodyHtml;
    const prevTitle = document.title;
    document.title = title;
    setTimeout(function () {
      if (window.AndroidBridge && typeof window.AndroidBridge.printPdf === "function") {
        window.AndroidBridge.printPdf(title);
      } else {
        window.print();
      }
      setTimeout(function () {
        document.title = prevTitle;
      }, 600);
    }, 100);
  }

  function buildCurrentWorkHtml() {
    const inp = state.inputs;
    const c = state.calc;
    const ts = state.tsData;
    const chDict = inp.systemKey === "2b11" ? TS_2B11 : TS_D30;
    const chLabel = chDict[inp.charge] ? chDict[inp.charge].label : inp.charge;
    const modeTxt = inp.systemKey === "2b11" ? "Миномёт" : (inp.d30Mode === "mort" ? "Мортирная" : (inp.d30Mode === "rik" ? "Рикошет" : "Настильная"));

    let h = '<div class="p-doc-title">АРМ СОБ — Огневая задача (Цель ' + escapeHtml(inp.goalNum) + ')</div>';
    h += '<div class="p-doc-sub">' + escapeHtml(inp.systemName + " • Заряд: " + chLabel + " • " + modeTxt + " • Орудий: " + inp.guns) + '</div>';

    h += '<div class="p-h2">1. Исходные данные</div><table class="p-grid"><tbody>';
    h += '<tr><th>КНП (X / Y / h)</th><td>' + escapeHtml((inp.knpX !== null ? inp.knpX : "—") + " / " + (inp.knpY !== null ? inp.knpY : "—") + " / " + (inp.knpH !== null ? inp.knpH : "—")) + '</td><th>ОП (X / Y / h)</th><td>' + escapeHtml((inp.opX !== null ? inp.opX : "—") + " / " + (inp.opY !== null ? inp.opY : "—") + " / " + (inp.opH !== null ? inp.opH : "—")) + '</td></tr>';
    h += '<tr><th>Цель / Задача</th><td>' + escapeHtml("№" + inp.goalNum + ", " + inp.goalType + " (" + inp.taskType + ")") + '</td><th>Позывные</th><td>' + escapeHtml(inp.callKnp + " / " + inp.callOp + " / " + inp.callCmd) + '</td></tr>';
    h += '<tr><th>Дк / αк / Mк</th><td>' + escapeHtml((inp.dk !== null ? inp.dk + " м" : "—") + " / " + (inp.ak !== null ? fmtMils(inp.ak, false) : "—") + " / " + (inp.mk || 0)) + '</td><th>ОН / Фц / Гц / Фб</th><td>' + escapeHtml((inp.on !== null ? fmtMils(inp.on, false) : "—") + " / " + (inp.fcRaw || "—") + " / " + (inp.gc !== null ? inp.gc + " м" : "—") + " / " + inp.fb + " м") + '</td></tr>';
    h += '<tr><th>ΔДцис / Δδиис</th><td>' + escapeHtml(inp.ddCis + " м / " + fmtMils(inp.ddeltaCis, true)) + '</td><th>Деривация Z</th><td>' + (inp.useDeriv ? "Учтена" : "Не учтена") + '</td></tr>';
    h += '</tbody></table>';

    if (c) {
      h += '<div class="p-h2">2. Расчётные данные и коэффициенты</div><table class="p-grid"><tbody>';
      h += '<tr><th>Координаты цели (Xц / Yц / hц)</th><td>' + c.xt + ' / ' + c.yt + ' / ' + c.ht + ' м</td><th>Дцт / αцт / δцт</th><td>' + c.dct + ' м / ' + fmtMils(c.act, false) + ' / ' + fmtMils(c.deltact, true) + '</td></tr>';
      h += '<tr><th>Ди / δи</th><td>' + c.di + ' м / ' + fmtMils(c.deltai, true) + '</td><th>Ур / Пр</th><td>' + fmtMils(c.ur, false) + ' / ' + c.effectivePr + ' (ΔХтыс=' + inp.dxTys + ' м' + (ts ? ', Вд=' + ts.vd + ' м' : '') + ')</td></tr>';
      h += '<tr><th>Ку / ПС / Шу</th><td>' + c.ku.toFixed(1) + ' / ' + fmtMils(Math.abs(c.ps), false) + ' (' + escapeHtml(c.opSide) + ') / ' + fmtMils(c.shu, false) + '</td><th>Ск / Iв</th><td>' + (inp.gc !== null ? c.skMeters + ' м (' + c.skTys + ' тыс.)' : '—') + ' / ' + fmtMils(c.iv, false) + (c.useTwoUglom ? ' (2 углом.)' : '') + '</td></tr>';
      h += '</tbody></table>';
    }

    h += '<div class="p-h2">3. Таблица стрельбы (Расход: ' + state.totalRashod + ')</div>';
    if (state.rows.length > 0) {
      h += '<table class="p-table"><thead><tr><th>№</th><th>Команда</th><th>Пр</th><th>Ур</th><th>Напр</th><th>Наблюдения</th><th>Расход</th></tr></thead><tbody>';
      state.rows.forEach(function (r) {
        h += '<tr><td>' + r.num + '</td><td>' + escapeHtml(r.cmd) + '</td><td>' + escapeHtml(r.pr) + '</td><td>' + escapeHtml(r.ur) + '</td><td>' + escapeHtml(r.napr) + '</td><td>' + escapeHtml(r.obs) + '</td><td>' + escapeHtml(String(r.rashod)) + '</td></tr>';
      });
      h += '</tbody></table>';
    } else {
      h += '<p>Таблица стрельбы пока пуста.</p>';
    }
    return h;
  }

  function buildCurrentWorkCsv() {
    const inp = state.inputs;
    const c = state.calc;
    const esc = function (v) { return '"' + String(v === null || v === undefined ? "" : v).replace(/"/g, '""') + '"'; };
    const lines = [];
    lines.push(["АРМ СОБ", inp.systemName, "Цель " + inp.goalNum, inp.goalType].map(esc).join(";"));
    if (c) {
      lines.push(["Xц", c.xt, "Yц", c.yt, "hц", c.ht, "Дцт", c.dct, "αцт", fmtMils(c.act, false), "δцт", fmtMils(c.deltact, true)].map(esc).join(";"));
      lines.push(["Ди", c.di, "δи", fmtMils(c.deltai, true), "Ур", fmtMils(c.ur, false), "Пр", c.effectivePr, "Ку", c.ku.toFixed(1), "ПС", fmtMils(c.ps, true), "Шу", fmtMils(c.shu, false)].map(esc).join(";"));
    }
    lines.push("");
    lines.push(["№", "Команда", "Пр", "Ур", "Напр", "Наблюдения", "Расход"].map(esc).join(";"));
    state.rows.forEach(function (r) {
      lines.push([r.num, r.cmd, r.pr, r.ur, r.napr, r.obs, r.rashod].map(esc).join(";"));
    });
    return "\uFEFF" + lines.join("\r\n");
  }

  function buildCurrentWorkTxt() {
    const inp = state.inputs;
    const c = state.calc;
    const out = [];
    out.push("АРМ СОБ — Цель " + inp.goalNum + " (" + inp.goalType + ")");
    out.push("Система: " + inp.systemName + " | Заряд: " + inp.charge + " | Орудий: " + inp.guns);
    out.push("КНП: " + inp.knpX + " / " + inp.knpY + " / " + inp.knpH + " | ОП: " + inp.opX + " / " + inp.opY + " / " + inp.opH);
    if (c) {
      out.push("Цель: Xц=" + c.xt + " Yц=" + c.yt + " hц=" + c.ht + " | Дцт=" + c.dct + " м | αцт=" + fmtMils(c.act, false) + " | δцт=" + fmtMils(c.deltact, true));
      out.push("Ди=" + c.di + " м | δи=" + fmtMils(c.deltai, true) + " | Ур=" + fmtMils(c.ur, false) + " | Пр=" + c.effectivePr + " | Ку=" + c.ku.toFixed(1) + " | ПС=" + fmtMils(c.ps, true) + " (" + c.opSide + ") | Шу=" + fmtMils(c.shu, false));
    }
    out.push("");
    out.push("ТАБЛИЦА СТРЕЛЬБЫ (Расход: " + state.totalRashod + "):");
    state.rows.forEach(function (r) {
      out.push(r.num + ") " + r.cmd + " | Пр:" + r.pr + " | Ур:" + r.ur + " | Напр:" + r.napr + " | Набл:" + r.obs + " | Расх:" + r.rashod);
    });
    return out.join("\r\n");
  }

  function createRandomTaskItem() {
    const knpCallsigns = ["Кама", "Волга", "Ока", "Сокол", "Беркут", "Гранит"];
    const opCallsigns = ["Вишня", "Акация", "Клён", "Ясень", "Тополь", "Берёза"];
    const cmdCallsigns = ["Дон", "Урал", "Амур", "Енисей", "Днепр"];
    const goalTypes = ["пехота на занятой позиции", "взводный опорный пункт", "миномётная батарея", "взвод самоходный", "наблюдательный пункт", "противотанковое орудие"];
    const knpX = randInt(82000, 98000);
    const knpY = randInt(28000, 48000);
    const knpH = randInt(80, 180);
    const is2b11 = state.appMode === "2b11";
    const d30Mode = is2b11 ? "nast" : (state.genD30FireMode === "random" ? pickRandom(["nast", "rik", "mort"]) : state.genD30FireMode);
    const minValidD = is2b11 ? 900 : (d30Mode === "mort" ? 4500 : 3200);
    const maxValidD = is2b11 ? 6500 : (d30Mode === "rik" ? 8200 : 14200);
    let opX, opY, dk, ak, xt, yt, dct;
    for (let attempt = 0; attempt < 40; attempt++) {
      const opAngle = Math.random() * 2 * Math.PI;
      const opDist = is2b11 ? randInt(800, 2600) : (d30Mode === "mort" ? randInt(3800, 9200) : randInt(2400, 6800));
      opX = Math.round(knpX + opDist * Math.cos(opAngle));
      opY = Math.round(knpY + opDist * Math.sin(opAngle));
      dk = is2b11 ? randInt(700, 2400) : randInt(1600, 3400);
      ak = randInt(0, 5999);
      const akRad = milsToRad(ak);
      xt = knpX + dk * Math.cos(akRad);
      yt = knpY + dk * Math.sin(akRad);
      dct = Math.hypot(xt - opX, yt - opY);
      if (dct >= minValidD && dct <= maxValidD) break;
    }
    const opH = Math.max(50, knpH + randInt(-35, 35));
    const act = radToMils(Math.atan2(yt - opY, xt - opX));
    const on = norm6000(act + randInt(-400, 400));
    const charge = pickChargeForDist(dct, state.appMode, d30Mode);
    const corrMode = state.genCorrMode || "pnzr";
    return {
      id: Date.now() + Math.random(),
      dct: Math.round(dct),
      corrMode: corrMode,
      scenarioSteps: buildScenarioSteps(corrMode),
      task: {
        systemKey: is2b11 ? "2b11" : "d30",
        systemName: is2b11 ? "120-мм миномёт 2Б11" : "122-мм Г Д-30",
        charge: charge,
        d30Mode: d30Mode,
        guns: pickRandom([4, 6]),
        callKnp: pickRandom(knpCallsigns),
        callOp: pickRandom(opCallsigns),
        callCmd: pickRandom(cmdCallsigns),
        knpX: knpX, knpY: knpY, knpH: knpH,
        opX: opX, opY: opY, opH: opH,
        goalNum: String(randInt(101, 199)),
        goalType: pickRandom(goalTypes),
        taskType: pickRandom(["Подавить", "Уничтожить"]),
        dk: dk, ak: fmtMils(ak, false), on: fmtMils(on, false),
        mk: randInt(-15, 15), fcRaw: fmtMils(randInt(20, 80), false),
        gc: randInt(80, 200), fb: 70,
        ddCis: randInt(-180, 180), ddeltaCis: fmtMils(randInt(-35, 35), true),
        startPr: 0, useDeriv: !is2b11
      }
    };
  }

  function solveTaskPure(item) {
    const t = item.task;
    const is2b11 = t.systemKey === "2b11";
    const ak = parseMils(t.ak);
    const on = parseMils(t.on);
    const ddeltaCis = parseMils(t.ddeltaCis);
    const akRad = milsToRad(ak);
    const xt = Math.round(t.knpX + t.dk * Math.cos(akRad));
    const yt = Math.round(t.knpY + t.dk * Math.sin(akRad));
    const ht = Math.round(t.knpH + 0.001 * t.dk * (t.mk || 0));
    const dct = Math.round(Math.hypot(xt - t.opX, yt - t.opY));
    const act = radToMils(Math.atan2(yt - t.opY, xt - t.opX));
    const actRad = milsToRad(act);
    const deltact = normDelta(act - on);
    const di = Math.round(dct + t.ddCis);
    const ts = lookupTs(t.systemKey, t.charge, di, t.d30Mode);
    const dxTys = ts ? ts.dxTys : 10;
    const derivCorr = (t.useDeriv && ts) ? -ts.z : 0;
    const deltai = normDelta(deltact + ddeltaCis + derivCorr);
    const ur = 3000 + (dct > 0 ? Math.round((ht - t.opH) / (0.001 * dct)) : 0);
    const effectivePr = t.startPr > 0 ? t.startPr : (ts ? ts.prTys : 0);
    const ku = dct > 0 ? Math.round((t.dk / dct) * 10) / 10 : 0;
    const ps = normDelta(ak - act);
    const opSide = ps >= 0 ? "ОП справа" : "ОП слева";
    const shu = dct > 0 ? Math.round(Math.abs(ps) / (0.01 * dct)) : 0;
    const fcStr = String(t.fcRaw || "0").trim();
    const fcMeters = fcStr.includes("-") ? Math.round(parseMils(fcStr) * 0.001 * t.dk) : (parseFloat(fcStr) || 0);
    const skMeters = Math.round(t.gc / 3);
    const skTys = dxTys > 0 ? Math.round(skMeters / dxTys) : 0;
    const gunsCount = Math.max(1, t.guns);
    const denomIv = 0.001 * dct * gunsCount;
    const useTwoUglom = fcMeters > 50 && (fcMeters / gunsCount) > 50;
    const frontForIv = useTwoUglom ? (fcMeters / 2) : fcMeters;
    const iv = fcMeters <= 50 ? 0 : (denomIv > 0 ? Math.max(0, Math.round((frontForIv - t.fb) / denomIv)) : 0);
    const uglomShift = useTwoUglom && dct > 0 ? Math.max(1, Math.round((fcMeters / 4) / (0.001 * dct))) : 0;

    const c = { xt: xt, yt: yt, ht: ht, dct: dct, act: act, actRad: actRad, deltact: deltact, di: di, deltai: deltai, ur: ur, effectivePr: effectivePr, ku: ku, ps: ps, opSide: opSide, shu: shu, fcMeters: fcMeters, skMeters: skMeters, skTys: skTys, iv: iv, useTwoUglom: useTwoUglom, uglomShift: uglomShift, dxTys: dxTys };
    const mortSign = (!is2b11 && t.d30Mode === "mort") ? -1 : 1;
    const evenStep = 2 * Math.max(1, dxTys);
    let forkStep = ts ? Math.max(evenStep, Math.round((8 * ts.vd) / evenStep) * evenStep) : 200;
    const vdVal = ts ? ts.vd : 25;

    function calcStep(st, fStep) {
      if (st.kind === "pkss_adj" || st.kind === "pkss_ffe") {
        const dxGeo = -(st.nsDir === "N" ? st.nsVal : -st.nsVal);
        const dyGeo = -(st.ewDir === "E" ? st.ewVal : -st.ewVal);
        const dRange = dxGeo * Math.cos(actRad) + dyGeo * Math.sin(actRad);
        const dSide = -dxGeo * Math.sin(actRad) + dyGeo * Math.cos(actRad);
        return { obsText: "Разрыв: " + (st.nsDir === "N" ? "С " : "Ю ") + st.nsVal + ", " + (st.ewDir === "E" ? "В " : "З ") + st.ewVal, dPr: Math.round(mortSign * (dRange / dxTys)), beta: dct > 0 ? Math.round(dSide / (0.001 * dct)) : 0 };
      }
      const alphaObs = st.side === "L" ? -Math.abs(st.dirVal || 0) : (st.side === "R" ? Math.abs(st.dirVal || 0) : 0);
      let deltaD = 0;
      if (st.kind === "series") {
        const sPreob = t.gc < 100 ? vdVal : skMeters;
        const sOnly = t.gc < 100 ? (2 * vdVal) : Math.round(skMeters * 1.5);
        if (st.seriesMode === "preob_plus") deltaD = sPreob;
        else if (st.seriesMode === "preob_minus") deltaD = -sPreob;
        else if (st.seriesMode === "only_plus") deltaD = sOnly;
        else if (st.seriesMode === "only_minus") deltaD = -sOnly;
      } else if (st.rSign === "+") deltaD = fStep;
      else if (st.rSign === "-") deltaD = -fStep;

      if (Math.abs(ps) >= 500) {
        const akRadR = milsToRad(norm6000(ak + alphaObs));
        const dkR = t.dk + deltaD;
        const xr = t.knpX + dkR * Math.cos(akRadR);
        const yr = t.knpY + dkR * Math.sin(akRadR);
        const drOp = Math.hypot(xr - t.opX, yr - t.opY);
        const arOp = radToMils(Math.atan2(yr - t.opY, xr - t.opX));
        return { obsText: st.text, dPr: Math.round(mortSign * (-(drOp - dct) / dxTys)), beta: -normDelta(arOp - act) };
      }
      const opRightSign = ps >= 0 ? -1 : 1;
      return { obsText: st.text, dPr: Math.round(mortSign * (-deltaD / dxTys)), beta: Math.round(-alphaObs * ku + opRightSign * (deltaD / 100) * shu) };
    }

    const ammoW = is2b11 ? "Мина" : "Сн.";
    const shotW = is2b11 ? "мину" : "снаряд";
    const adjCmdW = is2b11 ? "Осн. 1 мин. Ог." : "Осн. 1 сн. Ог.";
    const ffeShotW = is2b11 ? " мин. бег. Ог." : " сн. бег. Ог.";
    const fuzeW = (!is2b11 && t.d30Mode === "rik") ? "З" : "О";
    const modeW = (!is2b11 && t.d30Mode === "mort") ? " Мортирная." : ((!is2b11 && t.d30Mode === "rik") ? " На рикошет." : "");
    const cmd1 = "«" + t.callKnp + "». Стой. Цель " + t.goalNum + "-я, " + t.goalType + ". " + t.taskType + ". " + ammoW + " «ОФ». Взр. «" + fuzeW + "». Зар. " + (ts ? ts.cmdLabel : t.charge) + "." + modeW + " Шк. Тыс. Основному 1 " + shotW + ". Огонь.";
    const rows = [{ num: 1, cmd: cmd1, pr: String(effectivePr), ur: fmtMils(ur, false), napr: "ОН " + fmtMils(deltai, true), obs: "", rashod: 1 }];
    let curPr = effectivePr;
    let curNapr = deltai;
    let totalRashod = 1;
    let seenP = false;
    let seenM = false;
    const numUstRange = t.gc < 100 ? 1 : 3;
    const numUstDir = useTwoUglom ? 2 : 1;
    const ivText = fcMeters <= 50 ? "Сосредоточенный. " : (iv > 0 ? ("Iв " + fmtMils(iv, false) + ". ") : "Веер параллельный. ");
    const ugText = useTwoUglom ? ("Углом. 2 (±" + fmtMils(uglomShift, false) + "). ") : "";
    const ffeCmd = t.gc < 100 ? ("Батарее. " + ivText + ugText + "по 2" + ffeShotW) : ("Батарее. " + ivText + ugText + "Уст 2. Ск. " + skTys + ". по 2" + ffeShotW);
    const ffeShots = t.guns * 2 * numUstRange * numUstDir;

    (item.scenarioSteps || []).forEach(function (st) {
      if (st.kind === "pnzr_adj" || st.kind === "pkss_adj") {
        if (st.kind === "pnzr_adj") {
          if (st.rSign === "+") seenP = true;
          if (st.rSign === "-") seenM = true;
          if (seenP && seenM) forkStep = Math.max(evenStep, Math.round(forkStep / 2));
        }
        const r = calcStep(st, forkStep);
        rows[rows.length - 1].obs = r.obsText;
        curPr += r.dPr;
        curNapr += r.beta;
        totalRashod += 1;
        rows.push({ num: rows.length + 1, cmd: adjCmdW, pr: r.dPr > 0 ? "+" + r.dPr : String(r.dPr), ur: "", napr: fmtMils(r.beta, true), obs: "", rashod: 1 });
      } else if (st.kind === "pnzr_ffe" || st.kind === "pkss_ffe") {
        if (st.kind === "pnzr_ffe") {
          if (st.rSign === "+") seenP = true;
          if (st.rSign === "-") seenM = true;
          if (seenP && seenM) forkStep = Math.max(evenStep, Math.round(forkStep / 2));
        }
        const r = calcStep(st, forkStep);
        rows[rows.length - 1].obs = r.obsText;
        curPr += r.dPr;
        curNapr += r.beta;
        totalRashod += ffeShots;
        rows.push({ num: rows.length + 1, cmd: ffeCmd, pr: String(curPr), ur: "", napr: fmtMils(curNapr, true), obs: "", rashod: ffeShots });
      } else if (st.kind === "series") {
        const r = calcStep(st, forkStep);
        rows[rows.length - 1].obs = r.obsText;
        curPr += r.dPr;
        curNapr += r.beta;
        rows.push({ num: rows.length + 1, cmd: "«" + t.callKnp + "», Стой. Записать. Цель " + t.goalNum + "-я, " + t.goalType + ". Расход " + totalRashod + ".", pr: String(curPr), ur: fmtMils(ur, false), napr: fmtMils(curNapr, true), obs: "Корр. по серии: ΔПр " + (r.dPr > 0 ? "+" + r.dPr : r.dPr) + ", β " + fmtMils(r.beta, true), rashod: totalRashod });
      }
    });
    return { item: item, calc: c, ts: ts, rows: rows, totalRashod: totalRashod };
  }

  function renderVariantTaskHtml(solved, idx) {
    const t = solved.item.task;
    const chDict = t.systemKey === "2b11" ? TS_2B11 : TS_D30;
    const chLabel = chDict[t.charge] ? chDict[t.charge].label : t.charge;
    const modeTxt = t.systemKey === "2b11" ? "" : (" • " + (t.d30Mode === "mort" ? "Мортирная" : (t.d30Mode === "rik" ? "Рикошет" : "Настильная")));
    let h = '<div class="p-variant">';
    h += '<div class="p-doc-title">Вариант №' + idx + ' — Огневая задача (Цель ' + escapeHtml(t.goalNum) + ')</div>';
    h += '<div class="p-doc-sub">' + escapeHtml(t.systemName + " • Заряд: " + chLabel + modeTxt + " • " + (solved.item.corrMode === "pkss" ? "ПКСС" : "ПНЗР")) + '</div>';
    h += '<table class="p-grid"><tbody>';
    h += '<tr><th>Позывные / Орудий</th><td>' + escapeHtml(t.callKnp + " / " + t.callOp + " / " + t.callCmd + " (" + t.guns + " ор.)") + '</td><th>Цель / Задача</th><td>' + escapeHtml("№" + t.goalNum + ", " + t.goalType + " — " + t.taskType) + '</td></tr>';
    h += '<tr><th>КНП (X / Y / h)</th><td>' + t.knpX + ' / ' + t.knpY + ' / ' + t.knpH + ' м</td><th>ОП (X / Y / h)</th><td>' + t.opX + ' / ' + t.opY + ' / ' + t.opH + ' м</td></tr>';
    h += '<tr><th>Дк / αк / Mк</th><td>' + t.dk + ' м / ' + escapeHtml(t.ak) + ' / ' + t.mk + '</td><th>ОН / Фц / Гц / Фб</th><td>' + escapeHtml(t.on) + ' / ' + escapeHtml(t.fcRaw) + ' / ' + t.gc + ' м / ' + t.fb + ' м</td></tr>';
    h += '<tr><th>Поправки</th><td colspan="3">ΔДцис = ' + t.ddCis + ' м, Δδиис = ' + escapeHtml(t.ddeltaCis) + (t.useDeriv ? ' (учесть деривацию Z)' : '') + '</td></tr>';
    h += '</tbody></table>';
    h += '<div class="p-h2">Вводные по разрывам</div><ol class="p-steps">';
    (solved.item.scenarioSteps || []).forEach(function (st) {
      h += '<li><b>' + escapeHtml(st.stage) + ':</b> ' + escapeHtml(st.text) + '</li>';
    });
    h += '</ol></div>';
    return h;
  }

  function renderVariantSolutionHtml(solved, idx) {
    const t = solved.item.task;
    const c = solved.calc;
    const ts = solved.ts;
    let h = '<div class="p-variant">';
    h += '<div class="p-doc-title">Вариант №' + idx + ' — Решение (Цель ' + escapeHtml(t.goalNum) + ')</div>';
    h += '<div class="p-doc-sub">' + escapeHtml(t.systemName + " • Заряд: " + (ts ? ts.label : t.charge) + " • Расход: " + solved.totalRashod) + '</div>';
    h += '<table class="p-grid"><tbody>';
    h += '<tr><th>Цель (Xц / Yц / hц)</th><td>' + c.xt + ' / ' + c.yt + ' / ' + c.ht + ' м</td><th>Дцт / αцт / δцт</th><td>' + c.dct + ' м / ' + fmtMils(c.act, false) + ' / ' + fmtMils(c.deltact, true) + '</td></tr>';
    h += '<tr><th>Ди / δи</th><td>' + c.di + ' м / ' + fmtMils(c.deltai, true) + '</td><th>Ур / Пр</th><td>' + fmtMils(c.ur, false) + ' / ' + c.effectivePr + ' (ΔХтыс=' + c.dxTys + ' м, Вд=' + (ts ? ts.vd : '—') + ' м)</td></tr>';
    h += '<tr><th>Ку / ПС / Шу</th><td>' + c.ku.toFixed(1) + ' / ' + fmtMils(Math.abs(c.ps), false) + ' (' + escapeHtml(c.opSide) + ') / ' + fmtMils(c.shu, false) + '</td><th>Ск / Iв</th><td>' + c.skMeters + ' м (' + c.skTys + ' тыс.) / ' + fmtMils(c.iv, false) + (c.useTwoUglom ? ' (Углом. 2)' : '') + '</td></tr>';
    h += '</tbody></table>';
    h += '<table class="p-table"><thead><tr><th>№</th><th>Команда</th><th>Пр</th><th>Ур</th><th>Напр</th><th>Наблюдения</th><th>Расход</th></tr></thead><tbody>';
    solved.rows.forEach(function (r) {
      h += '<tr><td>' + r.num + '</td><td>' + escapeHtml(r.cmd) + '</td><td>' + escapeHtml(r.pr) + '</td><td>' + escapeHtml(r.ur) + '</td><td>' + escapeHtml(r.napr) + '</td><td>' + escapeHtml(r.obs) + '</td><td>' + escapeHtml(String(r.rashod)) + '</td></tr>';
    });
    h += '</tbody></table></div>';
    return h;
  }

  function buildBatchTxt(list, isSolutions) {
    return list.map(function (s, i) {
      const n = i + 1;
      const t = s.item.task;
      const lines = ["========================================"];
      if (!isSolutions) {
        lines.push("ВАРИАНТ №" + n + " — УСЛОВИЕ (Цель " + t.goalNum + ", " + t.goalType + ")");
        lines.push(t.systemName + " | Заряд: " + t.charge + " | Орудий: " + t.guns + " | " + (s.item.corrMode === "pkss" ? "ПКСС" : "ПНЗР"));
        lines.push("КНП: " + t.knpX + " / " + t.knpY + " / " + t.knpH + " | ОП: " + t.opX + " / " + t.opY + " / " + t.opH);
        lines.push("Дк=" + t.dk + " м | αк=" + t.ak + " | Mк=" + t.mk + " | ОН=" + t.on + " | Фц=" + t.fcRaw + " | Гц=" + t.gc + " м | Фб=" + t.fb + " м");
        lines.push("Поправки: ΔДцис=" + t.ddCis + " м, Δδиис=" + t.ddeltaCis);
        lines.push("Вводные:");
        (s.item.scenarioSteps || []).forEach(function (st, k) {
          lines.push("  " + (k + 1) + ". [" + st.stage + "] " + st.text);
        });
      } else {
        const c = s.calc;
        lines.push("ВАРИАНТ №" + n + " — РЕШЕНИЕ (Цель " + t.goalNum + ")");
        lines.push("Xц=" + c.xt + " Yц=" + c.yt + " hц=" + c.ht + " | Дцт=" + c.dct + " м | αцт=" + fmtMils(c.act, false) + " | δцт=" + fmtMils(c.deltact, true));
        lines.push("Ди=" + c.di + " м | δи=" + fmtMils(c.deltai, true) + " | Ур=" + fmtMils(c.ur, false) + " | Пр=" + c.effectivePr + " | Ку=" + c.ku.toFixed(1) + " | ПС=" + fmtMils(c.ps, true) + " (" + c.opSide + ") | Шу=" + fmtMils(c.shu, false));
        lines.push("Таблица стрельбы (Расход: " + s.totalRashod + "):");
        s.rows.forEach(function (r) {
          lines.push("  " + r.num + ") " + r.cmd + " | Пр:" + r.pr + " | Ур:" + r.ur + " | Напр:" + r.napr + " | Набл:" + r.obs + " | Расх:" + r.rashod);
        });
      }
      return lines.join("\r\n");
    }).join("\r\n\r\n");
  }

  function exportBatchPart(part) {
    const list = state.batchVariants;
    if (!list || list.length === 0) {
      showToast("Сначала сгенерируйте пакет вариантов");
      return;
    }
    const fmt = $("batchFormat") ? $("batchFormat").value : "pdf";
    const isSol = part === "solutions";
    const count = list.length;
    const prefix = state.appMode === "2b11" ? "2B11" : "D30";
    const baseName = (isSol ? "Решения_" : "Варианты_") + prefix + "_1-" + count;
    const bodyHtml = list.map(function (s, i) {
      return isSol ? renderVariantSolutionHtml(s, i + 1) : renderVariantTaskHtml(s, i + 1);
    }).join("");

    if (fmt === "pdf") {
      printHtmlDocument(baseName, bodyHtml);
    } else if (fmt === "doc") {
      downloadFile(baseName + ".doc", wrapWordDoc(baseName, bodyHtml), "application/msword;charset=utf-8");
    } else if (fmt === "html") {
      downloadFile(baseName + ".html", wrapStandaloneHtml(baseName, bodyHtml, true), "text/html;charset=utf-8");
    } else {
      downloadFile(baseName + ".txt", buildBatchTxt(list, isSol), "text/plain;charset=utf-8");
    }
  }

  function bindExportEvents() {
    if ($("btnOpenExport")) {
      $("btnOpenExport").addEventListener("click", function () { openModal("modalExport"); });
    }
    if ($("btnCloseExport")) {
      $("btnCloseExport").addEventListener("click", function () { closeModal("modalExport"); });
    }
    if ($("btnExpCurPdf")) {
      $("btnExpCurPdf").addEventListener("click", function () {
        closeModal("modalExport");
        printHtmlDocument("АРМ_СОБ_Цель_" + state.inputs.goalNum, buildCurrentWorkHtml());
      });
    }
    if ($("btnExpCurDoc")) {
      $("btnExpCurDoc").addEventListener("click", function () {
        const name = "АРМ_СОБ_Цель_" + state.inputs.goalNum + ".doc";
        downloadFile(name, wrapWordDoc(name, buildCurrentWorkHtml()), "application/msword;charset=utf-8");
        showToast("Word-файл сохранён");
      });
    }
    if ($("btnExpCurCsv")) {
      $("btnExpCurCsv").addEventListener("click", function () {
        downloadFile("АРМ_СОБ_Цель_" + state.inputs.goalNum + ".csv", buildCurrentWorkCsv(), "text/csv;charset=utf-8");
        showToast("CSV (Excel) сохранён");
      });
    }
    if ($("btnExpCurHtml")) {
      $("btnExpCurHtml").addEventListener("click", function () {
        const name = "АРМ_СОБ_Цель_" + state.inputs.goalNum;
        downloadFile(name + ".html", wrapStandaloneHtml(name, buildCurrentWorkHtml(), true), "text/html;charset=utf-8");
        showToast("HTML для PDF сохранён");
      });
    }
    if ($("btnExpCurTxt")) {
      $("btnExpCurTxt").addEventListener("click", function () {
        downloadFile("АРМ_СОБ_Цель_" + state.inputs.goalNum + ".txt", buildCurrentWorkTxt(), "text/plain;charset=utf-8");
        showToast("TXT сохранён");
      });
    }
    if ($("btnExpCurJson")) {
      $("btnExpCurJson").addEventListener("click", function () {
        const payload = JSON.stringify({ inputs: state.inputs, calc: state.calc, rows: state.rows, totalRashod: state.totalRashod }, null, 2);
        downloadFile("АРМ_СОБ_Цель_" + state.inputs.goalNum + ".json", payload, "application/json;charset=utf-8");
        showToast("JSON сохранён");
      });
    }

    if ($("btnGenExportTaskPdf")) {
      $("btnGenExportTaskPdf").addEventListener("click", function () {
        if (!state.currentGenItem) return;
        const solved = solveTaskPure(state.currentGenItem);
        printHtmlDocument("Задача_Цель_" + state.currentGenItem.task.goalNum, renderVariantTaskHtml(solved, 1));
      });
    }
    if ($("btnGenExportSolPdf")) {
      $("btnGenExportSolPdf").addEventListener("click", function () {
        if (!state.currentGenItem) return;
        const solved = solveTaskPure(state.currentGenItem);
        const html = renderVariantTaskHtml(solved, 1) + renderVariantSolutionHtml(solved, 1);
        printHtmlDocument("Решение_Цель_" + state.currentGenItem.task.goalNum, html);
      });
    }
    if ($("btnGenExportSolDoc")) {
      $("btnGenExportSolDoc").addEventListener("click", function () {
        if (!state.currentGenItem) return;
        const solved = solveTaskPure(state.currentGenItem);
        const name = "Решение_Цель_" + state.currentGenItem.task.goalNum;
        const html = renderVariantTaskHtml(solved, 1) + renderVariantSolutionHtml(solved, 1);
        downloadFile(name + ".doc", wrapWordDoc(name, html), "application/msword;charset=utf-8");
        showToast("Word-файл решения сохранён");
      });
    }

    if ($("btnBatchGenerate")) {
      $("btnBatchGenerate").addEventListener("click", function () {
        const n = Math.max(1, Math.min(100, parseInt($("batchCount").value, 10) || 10));
        $("batchCount").value = String(n);
        const list = [];
        for (let i = 0; i < n; i++) {
          list.push(solveTaskPure(createRandomTaskItem()));
        }
        state.batchVariants = list;
        $("batchStatusPill").textContent = "Готово: " + n + " вар.";
        $("btnBatchExportTasks").disabled = false;
        $("btnBatchExportSolutions").disabled = false;
        $("btnBatchExportBoth").disabled = false;
        showToast("Сгенерировано вариантов: " + n);
      });
    }
    if ($("btnBatchExportTasks")) {
      $("btnBatchExportTasks").addEventListener("click", function () { exportBatchPart("tasks"); });
    }
    if ($("btnBatchExportSolutions")) {
      $("btnBatchExportSolutions").addEventListener("click", function () { exportBatchPart("solutions"); });
    }
    if ($("btnBatchExportBoth")) {
      $("btnBatchExportBoth").addEventListener("click", function () {
        const fmt = $("batchFormat") ? $("batchFormat").value : "pdf";
        if (fmt === "pdf") {
          const list = state.batchVariants;
          if (!list.length) return;
          const prefix = state.appMode === "2b11" ? "2B11" : "D30";
          const n = list.length;
          const tHtml = list.map(function (s, i) { return renderVariantTaskHtml(s, i + 1); }).join("");
          const sHtml = list.map(function (s, i) { return renderVariantSolutionHtml(s, i + 1); }).join("");
          downloadFile("Варианты_" + prefix + "_1-" + n + ".html", wrapStandaloneHtml("Варианты " + prefix + " 1-" + n, tHtml, true), "text/html;charset=utf-8");
          setTimeout(function () {
            downloadFile("Решения_" + prefix + "_1-" + n + ".html", wrapStandaloneHtml("Решения " + prefix + " 1-" + n, sHtml, true), "text/html;charset=utf-8");
          }, 500);
          showToast("Скачаны 2 HTML-файла (открой и нажми Печать → PDF)");
          return;
        }
        exportBatchPart("tasks");
        setTimeout(function () {
          exportBatchPart("solutions");
        }, 500);
        showToast("Оба файла выгружены (условия + решения)");
      });
    }
  }

  function bindEvents() {
    document.querySelectorAll(".tab-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        switchTab(btn.getAttribute("data-tab"));
      });
    });

    document.querySelectorAll("#topSystemSwitch .sys-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        switchAppSystem(btn.getAttribute("data-sys-mode"));
      });
    });


    if ($("theorySearchInput")) {
      $("theorySearchInput").addEventListener("input", function () {
        state.theoryQuery = $("theorySearchInput").value;
        renderTheoryPanel();
      });
    }
    if ($("btnClearTheorySearch")) {
      $("btnClearTheorySearch").addEventListener("click", function () {
        state.theoryQuery = "";
        if ($("theorySearchInput")) $("theorySearchInput").value = "";
        renderTheoryPanel();
      });
    }
    document.querySelectorAll("#theoryFilterChips .theory-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll("#theoryFilterChips .theory-chip").forEach(function (c) {
          c.classList.remove("active");
        });
        chip.classList.add("active");
        state.theoryCat = chip.getAttribute("data-tcat") || "all";
        renderTheoryPanel();
      });
    });

    $("btnSobBadge").addEventListener("click", function () {
      if (state.activeTab === "gen") {
        switchTab("calc");
      } else {
        switchTab("gen");
      }
    });
    $("btnCloseGenTab").addEventListener("click", function () { switchTab("calc"); });
    document.querySelectorAll("#genCorrSwitch .seg-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("#genCorrSwitch .seg-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        state.genCorrMode = btn.getAttribute("data-gcorr") || "pnzr";
      });
    });
    document.querySelectorAll("#genD30FireModeSwitch .seg-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("#genD30FireModeSwitch .seg-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        state.genD30FireMode = btn.getAttribute("data-gd30") || "random";
      });
    });
    $("btnGenerateRandomTask").addEventListener("click", generateRandomTask);
        $("btnToggleGenCondition").addEventListener("click", function () {
      setConditionCollapsed(!state.genConditionCollapsed);
    });
    $("btnSolveGeneratedTask").addEventListener("click", solveGeneratedTask);
    $("btnGoToCalc").addEventListener("click", function () { switchTab("calc"); });
    $("btnGoToTable").addEventListener("click", function () { switchTab("table"); });
    $("btnClearGenHistory").addEventListener("click", function () {
      state.genHistory = [];
      saveGenHistory();
      renderGenHistory();
      showToast("История очищена");
    });

    document.querySelectorAll("[data-sign-target]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetId = btn.getAttribute("data-sign-target");
        const el = $(targetId);
        if (!el) return;
        const v = el.value.trim();
        if (!v) {
          el.value = "-";
        } else if (v.startsWith("-")) {
          el.value = v.slice(1);
        } else if (v.startsWith("+")) {
          el.value = "-" + v.slice(1);
        } else {
          el.value = "-" + v;
        }
        el.focus();
      });
    });
    $("btnOpenSetup").addEventListener("click", function () { openModal("modalSetup"); });
    $("btnEditInputsQuick").addEventListener("click", function () { openModal("modalSetup"); });
    $("btnCloseSetup").addEventListener("click", function () { closeModal("modalSetup"); });

    $("inSystem").addEventListener("change", function () {
      const val = $("inSystem").value;
      syncChargeOptions(val === "2b11");
      if ($("inD30ModeField")) {
        $("inD30ModeField").classList.toggle("hidden", val === "2b11");
      }
      if (val !== "custom" && val !== "d30" && val !== "2s1" && val !== "2b11") {
        $("inDxTys").value = val;
      }
    });

    if ($("inTargetInputMode")) {
      $("inTargetInputMode").addEventListener("change", syncTargetInputModeUI);
    }
    $("btnLoadVariant3").addEventListener("click", function () { loadPreset("variant3"); });
    $("btnClearSetup").addEventListener("click", function () {
      ["inGuns", "inDxTys", "inCallKnp", "inCallOp", "inCallCmd", "inKnpX", "inKnpY", "inKnpH",
       "inOpX", "inOpY", "inOpH", "inTargetX", "inTargetY", "inTargetH", "inGoalNum", "inGoalType", "inTaskType", "inDk", "inAk",
       "inOn", "inBaseUglom", "inMk", "inFc", "inGc", "inFb", "inDdCis", "inDdeltaCis", "inStartPr"].forEach(function (id) {
        $(id).value = "";
      });
      $("inUseDeriv").checked = false;
    state.activeScenario = null;
    state.currentGenItem = null;
    renderScenarioViews();
      readSetupInputs();
      computeAll();
      showToast("Поля очищены");
    });

    $("btnApplySetup").addEventListener("click", function () {
    state.activeScenario = null;
    state.currentGenItem = null;
    renderScenarioViews();
      readSetupInputs();
      computeAll();
      saveWorkState();
      closeModal("modalSetup");
      showToast("Данные и ТС Д-30 рассчитаны");
    });

    $("btnResetAll").addEventListener("click", function () {
    state.activeScenario = null;
    state.currentGenItem = null;
    renderScenarioViews();
      state.rows = [];
      state.totalRashod = 0;
      state.ffeActive = false;
      saveWorkState();
      renderTable();
      openModal("modalSetup");
    });

    ["cmd1Shell", "cmd1Fuze"].forEach(function (id) {
      $(id).addEventListener("input", updateCmd1Preview);
    });

    $("cmd1Charge").addEventListener("change", function () {
      state.inputs.charge = $("cmd1Charge").value;
      $("inCharge").value = state.inputs.charge;
      computeAll();
    });

    $("btnRecalc").addEventListener("click", function () {
      readSetupInputs();
      computeAll();
      showToast("Пересчитано по ТС Д-30");
    });

    $("btnGenerateCmd1").addEventListener("click", generateCommand1);

    $("btnOpenBurst").addEventListener("click", function () {
      if (state.rows.length === 0) {
        showToast("Сначала сформируйте 1-ю команду!");
        return;
      }
      if (state.readyForEffect) {
        state.burstTapCount += 1;
        clearTimeout(state.burstTapTimer);
        if (state.burstTapCount < 3) {
          $("btnOpenBurst").textContent = "Разрыв (" + state.burstTapCount + "/3)";
          state.burstTapTimer = setTimeout(function () {
            state.burstTapCount = 0;
            $("btnOpenBurst").textContent = "Разрыв / Корректура";
          }, 2500);
          return;
        }
      }
      state.burstTapCount = 0;
      $("btnOpenBurst").textContent = "Разрыв / Корректура";
      updateBurstPreview();
      openModal("modalBurst");
    });
    $("btnCloseBurst").addEventListener("click", function () { closeModal("modalBurst"); });

    document.querySelectorAll("#burstModeSwitch .seg-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("#burstModeSwitch .seg-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        state.burstMode = btn.getAttribute("data-mode");
        $("burstModePanel").classList.toggle("hidden", state.burstMode !== "burst");
        $("pkssModePanel").classList.toggle("hidden", state.burstMode !== "pkss");
        updateBurstPreview();
      });
    });

    if ($("inFuzeMode")) {
      $("inFuzeMode").addEventListener("change", function () {
        const fm = $("inFuzeMode").value;
        if ($("inTrStartField")) $("inTrStartField").classList.toggle("hidden", fm !== "dt");
        if ($("inHoptField")) $("inHoptField").classList.toggle("hidden", fm !== "dt");
        if ($("cmd1Fuze")) {
          if (fm === "dt") $("cmd1Fuze").value = "Т-90";
          else if (fm === "rv") $("cmd1Fuze").value = "АР-30 (В)";
          else $("cmd1Fuze").value = "О";
        }
      });
    }

    [
      "bDirSide", "bDirVal", "bRangeSign", "bRangeMeters", "bForkStep",
      "bSeriesMode", "bShellsPerGun", "bExactPs", "bHeightType", "bHeightMils", "pRefType", "pNsDir", "pNsVal", "pEwDir", "pEwVal"
    ].forEach(function (id) {
      $(id).addEventListener("input", updateBurstPreview);
      $(id).addEventListener("change", updateBurstPreview);
    });

    $("btnApplyBurst").addEventListener("click", applyBurstCorrection);
    $("btnFireForEffect").addEventListener("click", function () {
      if (state.rows.length === 0) {
        showToast("Сначала сформируйте 1-ю команду!");
        return;
      }
      $("bFireMode").value = "battery";
      if (state.forkAlreadyHalved) {
        $("bRangeSign").value = "target";
        $("bRangeMeters").value = "";
      } else if (state.seenPlus && state.seenMinus && $("bRangeMeters").value.trim() === "") {
        const curFork = parseFloat($("bForkStep").value) || 200;
        const dxStep = Math.max(1, state.inputs.dxTys || 10);
        $("bForkStep").value = String(Math.max(2 * dxStep, Math.round(curFork / 2)));
      }
      updateBurstPreview();
      openModal("modalBurst");
    });

    $("bSeriesMode").addEventListener("change", function () {
      if ($("bSeriesMode").value !== "single") {
        $("bFireMode").value = "same";
      }
      updateBurstPreview();
    });
    $("btnRecordEnd").addEventListener("click", function () { addSpecialRow("record"); });
    $("btnFinishFire").addEventListener("click", function () { addSpecialRow("finish"); });

    document.querySelectorAll("#prkModelSwitch .seg-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("#prkModelSwitch .seg-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        state.prkModel = btn.getAttribute("data-prk");
        renderPrkPanel();
        renderLearnPanel();
      });
    });

    $("btnToggleManualPrk").addEventListener("click", function () {
      state.prkManual = !state.prkManual;
      if (!state.prkManual && state.calc) {
        state.prkAngle = state.calc.ps;
      }
      renderPrkPanel();
    });

    document.querySelectorAll("#prkActiveCircleSwitch .seg-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("#prkActiveCircleSwitch .seg-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        state.prkActiveCircle = btn.getAttribute("data-circle");
        renderPrkPanel();
      });
    });

    document.querySelectorAll("[data-rot]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!state.prkManual) return;
        const delta = parseInt(btn.getAttribute("data-rot"), 10) || 0;
        if (state.prkModel === "69" && state.prkActiveCircle === "right") {
          state.prkAngleRight = normDelta(state.prkAngleRight + delta);
        } else {
          state.prkAngle = normDelta(state.prkAngle + delta);
        }
        renderPrkPanel();
      });
    });

    $("prkAngleSlider").addEventListener("input", function () {
      if (!state.prkManual) return;
      const val = parseInt($("prkAngleSlider").value, 10) || 0;
      if (state.prkModel === "69" && state.prkActiveCircle === "right") {
        state.prkAngleRight = val;
      } else {
        state.prkAngle = val;
      }
      renderPrkPanel();
    });

    $("prkRulerSlider").addEventListener("input", function () {
      if (!state.prkManual) return;
      state.prkRulerX = parseInt($("prkRulerSlider").value, 10) || 0;
      renderPrkPanel();
    });

    $("btnPrkSyncAuto").addEventListener("click", function () {
      state.prkAngle = state.calc ? state.calc.ps : 0;
      state.prkAngleRight = state.calc ? Math.round(state.calc.ps * 0.6) : 0;
      state.prkRulerX = 0;
      renderPrkPanel();
    });

    document.querySelectorAll("#prkToolSwitch .seg-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("#prkToolSwitch .seg-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        state.prkTool = btn.getAttribute("data-tool");
      });
    });

    document.querySelectorAll("[data-clear]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const what = btn.getAttribute("data-clear");
        if (what === "all") {
          state.prkMarks = [];
        } else {
          state.prkMarks = state.prkMarks.filter(function (m) { return m.type !== what; });
        }
        renderPrkPanel();
      });
    });

    document.querySelectorAll("#panel-calc .kv-item").forEach(function (item) {
      item.addEventListener("click", function () {
        if (item.classList.contains("has-formula")) {
          item.classList.toggle("open");
        }
      });
    });

    $("prkSvg").addEventListener("click", function (ev) {
      if (!state.prkManual) {
        showToast("Нажмите «Отдельная оцифровка», чтобы ставить метки");
        return;
      }
      const rect = $("prkSvg").getBoundingClientRect();
      const sx = ((ev.clientX - rect.left) / rect.width) * 380;
      const sy = ((ev.clientY - rect.top) / rect.height) * 280;

      let cx = 190;
      let cy = 148;
      let rotMils = state.prkAngle;
      let target = "prk75";

      if (state.prkModel === "69") {
        cy = 102;
        if (sx < 190) {
          cx = 94;
          rotMils = state.prkAngle;
          target = "left";
        } else {
          cx = 286;
          rotMils = state.prkAngleRight;
          target = "right";
        }
      }

      const rad = -((rotMils * 2 * Math.PI) / 6000);
      const dx = sx - cx;
      const dy = sy - cy;
      const lx = cx + dx * Math.cos(rad) - dy * Math.sin(rad);
      const ly = cy + dx * Math.sin(rad) + dy * Math.cos(rad);

      state.prkMarks.push({ x: lx, y: ly, type: state.prkTool, target: target });
      renderPrkPanel();
    });

    document.querySelectorAll("#learnToolSwitch .seg-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("#learnToolSwitch .seg-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        state.learnTool = btn.getAttribute("data-ltool");
        renderLearnPanel();
      });
    });
    bindExportEvents();
  }


  function saveWorkState() {
    try {
      const payload = {
        inputs: state.inputs,
        rows: state.rows,
        currentPr: state.currentPr,
        currentUr: state.currentUr,
        currentNapr: state.currentNapr,
        totalRashod: state.totalRashod,
        seenPlus: state.seenPlus,
        seenMinus: state.seenMinus,
        readyForEffect: state.readyForEffect,
        forkAlreadyHalved: state.forkAlreadyHalved,
        ffeActive: state.ffeActive,
        lastBurst: state.lastBurst,
        activeScenario: state.activeScenario
      };
      localStorage.setItem(getWorkKey(), JSON.stringify(payload));
    } catch (e) {
      // ignore storage errors
    }
  }

  function loadWorkState() {
    try {
      const raw = localStorage.getItem(getWorkKey());
      if (!raw) return false;
      const p = JSON.parse(raw);
      if (!p || !p.inputs) return false;
      const t = p.inputs;
      const sysW = t.systemKey || "d30";
      $("inSystem").value = sysW;
      if ($("inD30Mode")) $("inD30Mode").value = t.d30Mode || "nast";
      if ($("inFuzeMode")) {
        $("inFuzeMode").value = t.fuzeMode || "impact";
        if ($("inTrStartField")) $("inTrStartField").classList.toggle("hidden", $("inFuzeMode").value !== "dt");
        if ($("inHoptField")) $("inHoptField").classList.toggle("hidden", $("inFuzeMode").value !== "dt");
      }
      if ($("inTrStart")) $("inTrStart").value = t.trStart || "";
      if ($("inHopt") && t.hOpt) $("inHopt").value = t.hOpt;
      syncChargeOptions(sysW === "2b11");
      $("inCharge").value = t.charge || (sysW === "2b11" ? "4" : "2");
      $("inGuns").value = t.guns || 4;
      if (t.dxTys) $("inDxTys").value = t.dxTys;
      $("inCallKnp").value = t.callKnp || "";
      $("inCallOp").value = t.callOp || "";
      $("inCallCmd").value = t.callCmd || "";
      if (t.knpX !== null) $("inKnpX").value = t.knpX;
      if (t.knpY !== null) $("inKnpY").value = t.knpY;
      if (t.knpH !== null) $("inKnpH").value = t.knpH;
      if (t.opX !== null) $("inOpX").value = t.opX;
      if (t.opY !== null) $("inOpY").value = t.opY;
      if (t.opH !== null) $("inOpH").value = t.opH;
      $("inGoalNum").value = t.goalNum && t.goalNum !== "—" ? t.goalNum : "";
      $("inGoalType").value = t.goalType && t.goalType !== "цель" ? t.goalType : "";
      $("inTaskType").value = t.taskType || "";
      if ($("inTargetInputMode")) { $("inTargetInputMode").value = t.targetInputMode || "polar"; syncTargetInputModeUI(); }
      if (t.targetX !== null && t.targetX !== undefined && $("inTargetX")) $("inTargetX").value = t.targetX;
      if (t.targetY !== null && t.targetY !== undefined && $("inTargetY")) $("inTargetY").value = t.targetY;
      if (t.targetH !== null && t.targetH !== undefined && $("inTargetH")) $("inTargetH").value = t.targetH;
      if (t.dk !== null) $("inDk").value = t.dk;
      if (t.ak !== null) $("inAk").value = fmtMils(t.ak, false);
      if (t.on !== null) $("inOn").value = fmtMils(t.on, false);
      if (t.baseUglom !== null && t.baseUglom !== undefined) $("inBaseUglom").value = fmtMils(t.baseUglom, false);
      if (t.mk) $("inMk").value = t.mk;
      $("inFc").value = t.fcRaw || "";
      if (t.gc !== null) $("inGc").value = t.gc;
      if (t.fb) $("inFb").value = t.fb;
      if (t.ddCis) $("inDdCis").value = t.ddCis;
      if (t.ddeltaCis) $("inDdeltaCis").value = fmtMils(t.ddeltaCis, true);
      if (t.startPr) $("inStartPr").value = t.startPr > 0 ? t.startPr : "";
      $("inUseDeriv").checked = !!t.useDeriv;

      readSetupInputs();
      computeAll();

      state.rows = Array.isArray(p.rows) ? p.rows : [];
      state.currentPr = p.currentPr || 0;
      state.currentUr = p.currentUr || 3000;
      state.currentNapr = p.currentNapr || 0;
      state.totalRashod = p.totalRashod || 0;
      state.seenPlus = !!p.seenPlus;
      state.seenMinus = !!p.seenMinus;
      state.readyForEffect = !!p.readyForEffect;
      state.forkAlreadyHalved = !!p.forkAlreadyHalved;
      state.ffeActive = !!p.ffeActive;
      state.lastBurst = p.lastBurst || null;
      state.activeScenario = p.activeScenario || null;
      renderScenarioViews();
      return state.rows.length > 0;
    } catch (e) {
      return false;
    }
  }

  function initApp() {
    if ("serviceWorker" in navigator && (location.protocol === "https:" || location.protocol === "http:")) {
      navigator.serviceWorker.register("./sw.js").catch(function () {});
    }

    try {
      const savedMode = localStorage.getItem(MODE_STORAGE_KEY);
      if (savedMode === "2b11" || savedMode === "d30") state.appMode = savedMode;
    } catch (e) {}
    applyThemeForMode(state.appMode);
    if (state.appMode === "2b11") {
      $("inSystem").value = "2b11";
      $("inCharge").value = "4";
    }
    bindEvents();
    loadGenHistory();
    const hasRows = loadWorkState();
    if (!hasRows) {
      readSetupInputs();
      computeAll();
      renderTable();
      renderLearnPanel();
      openModal("modalSetup");
    } else {
      renderTable();
      renderLearnPanel();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();