-- fat :: Int -> Int
-- fat x 
--     |x == 0 = 1
--     |otherwise = fat (x-1) * x
--     -- Usando Guardas (esquema if else)

-- fatCP :: Int -> Int
-- fatCP 0 = 1
-- fatCP n = n * fatCP(n-1)
--     -- Usando casamento de padrões

-- myAnd1 :: Bool -> Bool -> Bool
-- myAnd1 True True   = True
-- myAnd1 True False  = False
-- myAnd1 False True  = False
-- myAnd1 False False = False

-- myAnd2 :: Bool -> Bool -> Bool
-- myAnd2 True True = True
-- myAnd2 _ _ = False
-- -- Os valores do _ não interessam, o resultado sempre vai ser falso

-- myOr1 :: Bool -> Bool -> Bool
-- myOr1 True True   = True
-- myOr1 True False  = True
-- myOr1 False True  = True
-- myOr1 False False = False

-- myOr2 :: Bool -> Bool -> Bool
-- myOr2 True x = True
-- myOr2 False x = x

-- myOr3 :: Bool -> Bool -> Bool
-- myOr3 True _ = True
-- myOr3 _ x = x

-- quadrado :: Int -> Int
-- quadrado x = x * x
-- -- f (x+1) != f x + 1

-- iguais4 :: Int -> Int -> Int -> Int -> Bool
-- iguais4 x y z w = (x == y) && (z == w) && (x == w)

-- numIguais3 :: Int -> Int -> Int -> Int
-- numIguais3 x y z
--     |(x == y) && (y == z) = 3
--     |(x == y) = 2
--     |(x == z) = 2
--     |(y == z) = 2
--     | otherwise = 1

fat :: Int -> Int
fat x 
    |x == 0 = 1
    |otherwise = fat (x-1) * x

-- somaQuadrados :: Int -> Int -> Int
-- somaQuadrados x y = quadX + quadY
--     where
--         quadX = x * x 
--         quadY = y * y 

-- somaQuadrados2 :: Int -> Int -> Int
-- somaQuadrados2 x y = quad x + quad y 
--     where quad n = n * n

-- somaQuadradosLetIn :: Int -> Int -> Int
-- somaQuadradosLetIn x y = let quadX = x * x 
--                              quadY = y * y 
--                          in  quadX + quadY

-- exOr :: Bool -> Bool -> Bool
-- exOr x y = (x || y) && not (x && y)

-- exOrCP :: Bool -> Bool -> Bool
-- exOrCP True x = not x
-- exOrCP _ x = x

-- maxBound :: Type diz o valor maximo de um tipo

-- import Data.Char 
-- :m Data.Char para importar no interpretador

-- maiuscula :: Char -> Char
-- maiuscula ch = toEnum (fromEnum ch - offSet)
--     where offSet = fromEnum 'a' - fromEnum 'A' 

-- ehDigito :: Char -> Bool
-- ehDigito ch = ('0' <= ch ) && (ch <= '9')

-- concatenação é ++ entre [Char] e [Char]
-- show para transformar em [Char]
-- read para transformar [Char] em um objeto
-- read "True" :: Bool devolde True

-- addEspacos :: Int -> String
-- addEspacos 0 = ""
-- addEspacos x = addEspacos (x - 1) ++ " "

-- intP :: (Int, Int)
-- intP = (1, 2)

-- addPair :: (Int, Int) -> Int
-- addPair (x, y) = x + y

-- addPair2 :: (Int, Int) -> Int
-- addPair2 p = fst p + snd p
-- -- fst e snd acessam o primeiro e segundo elementos da tupla

-- primeiro :: (Int, Int) -> Int
-- primeiro (x , y) = x

-- oneRoot :: Float -> Float -> Float -> Float
-- oneRoot a b c = -b/(2.0*a)

-- twoRoots :: Float -> Float -> Float -> (Float, Float)
-- twoRoots a b c = (d - e, d + e)
--     where
--     d = -b/(2.0*a)
--     e = sqrt(b^2 - 4.0*a*c)/(2.0*a)

-- roots :: Float -> Float -> Float -> String
-- roots a b c
--     | b^2 == 4.0 * a * c = show (oneRoot a b c)
--     | b^2 >  4.0 * a * c = show f ++ " " ++ show s
--     | otherwise          = "no roots"
--       where (f, s) = twoRoots a b c

type Name = String
type Age = Int
type Phone = Int
type Person = (Name, Age, Phone)

