class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def get_info(self):
        return f"{self.name}: {self.price} руб."


class Order:
    def __init__(self):
        self.items = []
        self.total_cost = 0.0

    def add_product(self, product):
        self.items.append(product)
        self.total_cost += product.price

    def remove_product(self, product_name):
        for i, item in enumerate(self.items):
            if item.name == product_name:
                self.total_cost -= item.price
                self.items.pop(i)
                return

    def print_receipt(self):
        print("Чек:")
        for item in self.items:
            print(f"  {item.get_info()}")
        print(f"Итого: {self.total_cost} руб.")